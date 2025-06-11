import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
