"use client";

import { Button } from "@heroui/button";
import { useFormStatus } from "react-dom";

export const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      isDisabled={pending}
      className="w-full h-[56px]"
      type="submit"
      color="primary"
    >
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
};
