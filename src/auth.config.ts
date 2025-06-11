import type { NextRequest } from "next/server";

import type { NextAuthConfig, Session } from "next-auth";

const protectedRoutes = ["/new-article"];

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      const { pathname } = request.nextUrl;

      if (
        !auth &&
        protectedRoutes.some((route) => pathname.startsWith(route))
      ) {
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
