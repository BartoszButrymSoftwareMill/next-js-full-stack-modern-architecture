import Image from "next/image";

import { Button } from "@heroui/button";

import { login } from "@/lib/actions/user.actions";

export const SignInForm = () => {
  return (
    <form action={login}>
      <Button
        type="submit"
        className="h-[56px] cursor-pointer w-full border-slate-900"
        variant="bordered"
        disableAnimation
      >
        <Image
          src="/images/google.svg"
          width={25}
          height={25}
          alt="Google logo"
        />
        Sign in with Google
      </Button>
    </form>
  );
};
