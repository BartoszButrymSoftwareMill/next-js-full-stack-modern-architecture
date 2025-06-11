import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";

import { brigitkaFont } from "@/assets/fonts/fonts";
import { auth } from "@/auth";
import { LogoIcon } from "@/components/icons";

import AuthPanel from "./auth-panel";

export default async function Header() {
  const session = await auth();

  const menuItems = [
    { label: "Articles", path: "/", visible: true },
    { label: "New article", path: "/new-article", visible: !!session },
  ];

  return (
    <Navbar isBordered>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link className="font-bold text-slate-900" href="/">
            <LogoIcon className="mr-2" />
            <h1 className={`${brigitkaFont.className} text-3xl tracking-wider`}>
              READIUM
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {menuItems
          .filter((item) => item.visible)
          .map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                className="w-full text-slate-900"
                href={item.path}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        <AuthPanel />
      </NavbarContent>
      <NavbarMenu>
        {menuItems
          .filter((item) => item.visible)
          .map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-slate-900"
                href={item.path}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </Navbar>
  );
}
