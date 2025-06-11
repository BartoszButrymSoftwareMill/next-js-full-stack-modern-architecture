import Image from "next/image";
import { redirect } from "next/navigation";

import { Card, CardBody, CardHeader } from "@heroui/react";

import { auth } from "@/auth";

import { CredentialsSignInForm } from "./modules/credentials-sign-in-form";
import { SignInForm } from "./modules/oauth-sign-in-form";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="gap-4 py-4">
        <CardHeader className="flex justify-center items-center space-y-4">
          <Image
            src="/images/logo.svg"
            width={48}
            height={48}
            alt="Readium logo"
            className="dark:invert"
          />
        </CardHeader>
        <CardBody className="space-y-4">
          <SignInForm />
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <span className="absolute px-3 font-normal text-gray-500 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              Or continue with email
            </span>
          </div>
          <CredentialsSignInForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignInPage;
