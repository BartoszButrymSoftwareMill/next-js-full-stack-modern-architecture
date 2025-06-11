"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { ThemeSwitcher } from "./theme-switcher";

type Props = {
  image: string;
  email: string;
  children: React.ReactNode;
};

export const UserDropdown = ({ image, email, children }: Props) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          src={image}
          isBordered
          color="primary"
          as="button"
          className="transition-transform"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem
          key="theme-mode"
          className="text-right"
          closeOnSelect={false}
        >
          <ThemeSwitcher />
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          {children}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
