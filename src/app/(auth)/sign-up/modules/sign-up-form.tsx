"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Input } from "@heroui/react";

import { signup } from "@/lib/actions/user.actions";
import { signUpDefaultValues } from "@/lib/constants";

import { SignUpButton } from "../components/sign-up-button";

export const SignUpForm = () => {
  const [data, action] = useActionState(signup, {
    success: false,
    message: "",
  });

  return (
    <form action={action}>
      <div className="space-y-6">
        <div>
          <Input
            id="name"
            name="name"
            type="text"
            isRequired
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
            label="Name"
            variant="bordered"
            classNames={{ inputWrapper: "border-slate-900" }}
          />
        </div>
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            isRequired
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
            label="Email"
            variant="bordered"
            classNames={{ inputWrapper: "border-slate-900" }}
          />
        </div>
        <div>
          <Input
            id="password"
            name="password"
            type="password"
            isRequired
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
            label="Password"
            variant="bordered"
            classNames={{ inputWrapper: "border-slate-900" }}
          />
        </div>
        <div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            isRequired
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
            label="Confirm password"
            variant="bordered"
            classNames={{ inputWrapper: "border-slate-900" }}
          />
        </div>

        <SignUpButton />

        {data && !data.success && (
          <p className="text-red-700">{data.message}</p>
        )}

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/sign-in" target="_self" className="link text-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
