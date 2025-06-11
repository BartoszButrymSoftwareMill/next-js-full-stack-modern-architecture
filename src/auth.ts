import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import db from "./db";
import { getUserByEmail } from "./lib/actions/user.actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        const { email, password } = credentials;

        const res = await getUserByEmail(email as string, password as string);

        if (res.success) {
          return res.data as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
});
