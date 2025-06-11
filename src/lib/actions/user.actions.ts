"use server";

import { compareSync, hashSync } from "bcrypt-ts-edge";
import { eq } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn, signOut } from "@/auth";
import db from "@/db";
import { users } from "@/db/schema";
import { FormState, ValidationError } from "@/types";
import { signInFormSchema } from "@/validations/sign-in.validator";
import { signUpFormSchema } from "@/validations/sign-up.validator";

import { formatError } from "../utils";

export async function login() {
  await signIn("google", { redirectTo: "/" });
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function signup(_state: FormState, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, user.email),
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    const plainPassword = user.password;
    const hashedPassword = hashSync(user.password, 10);

    await db
      .insert(users)
      .values({ name: user.name, email: user.email, password: hashedPassword })
      .returning({ id: users.id });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error as ValidationError) };
  }
}

export async function signInWithCredentials(
  _state: FormState,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

export async function getUserByEmail(email: string, password: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (!user.password) {
      return {
        success: false,
        message: "Password is required.",
      };
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: "Wrong password.",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error as ValidationError),
    };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error as ValidationError),
    };
  }
}
