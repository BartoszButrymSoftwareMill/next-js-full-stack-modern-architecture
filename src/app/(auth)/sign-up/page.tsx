import Image from "next/image";
import { redirect } from "next/navigation";

import { Card, CardBody, CardHeader } from "@heroui/react";

import { auth } from "@/auth";

import { SignUpForm } from "./modules/sign-up-form";

const SignUpPage = async () => {
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
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpPage;
