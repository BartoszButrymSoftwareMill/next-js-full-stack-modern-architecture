"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Input } from "@heroui/react";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { signInDefaultValues } from "@/lib/constants";

import { SignInButton } from "../components/sign-in-button";

export const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <form action={action}>
      <div className="space-y-6">
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            isRequired
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
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
            defaultValue={signInDefaultValues.password}
            label="Password"
            variant="bordered"
            classNames={{ inputWrapper: "border-slate-900" }}
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-red-700">{data.message}</div>
        )}

        <div className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className="link text-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
