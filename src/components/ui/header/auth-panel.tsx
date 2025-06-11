import Link from "next/link";

import { Button } from "@heroui/button";
import { NavbarItem } from "@heroui/react";

import { auth } from "@/auth";

import { LogoutButton } from "./logout-button";
import { UserDropdown } from "./user-dropdown";

export default async function AuthPanel() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            variant="bordered"
            radius="sm"
            disableAnimation
            href="/sign-in"
            className="border-slate-900 text-slate-900"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            color="primary"
            href="/sign-up"
            variant="flat"
            radius="sm"
            disableAnimation
          >
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }

  return (
    <UserDropdown image={session.user!.image!} email={session.user!.email!}>
      <LogoutButton />
    </UserDropdown>
  );
}
