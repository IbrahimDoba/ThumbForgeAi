import authConfig from "@/auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { UserRole } from "@/drizzle/schema"; // Define `UserRole` in your Drizzle schema
import NextAuth, { type DefaultSession } from "next-auth";

import { db } from "@/lib/db"; // Ensure `db` is configured for Drizzle
import { getUserById } from "@/lib/user"; // Update getUserById to use Drizzle

// Augment NextAuth's session type
declare module "next-auth" {
  interface Session {
    user: {
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub ?? null;
        session.user.email = token.email ?? null;
        // session.user.role = token.role as UserRole;
        session.user.name = token.name ?? null;
        session.user.image = token.picture ?? null;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub); // Ensure this uses Drizzle for retrieval

      if (!dbUser) return token;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      // token.role = dbUser.role;

      return token;
    },
  },
  ...authConfig,
});
