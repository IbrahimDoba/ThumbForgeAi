import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
<<<<<<< HEAD:auth.ts
import { db } from "./lib/db"
import { accounts, sessions, users } from "./lib/db/schema"
import { generateUsername } from "./lib/services"
import { eq } from "drizzle-orm"
=======
import { accounts, users } from "./lib/db/schema"
import { generateUsername } from "./lib/services"
import NextAuth, { User } from "next-auth"
import { db } from "./lib/db"
>>>>>>> 4070b60492946818682513b7d22237085144691e:src/auth.ts

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
<<<<<<< HEAD:auth.ts
    // sessionsTable: sessions,
=======
>>>>>>> 4070b60492946818682513b7d22237085144691e:src/auth.ts
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const username = generateUsername(profile.email);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture || `https://avatar.vercel.sh/${profile.name}?size=30`,
          username,
          subscriptionPlan: 'free',
          credits: 6,
        } as User;
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      async profile(profile) {
        const username = generateUsername(profile.email);
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          username,
          subscriptionPlan: 'free',
          credits: 6,
        } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.subscriptionPlan = user.subscriptionPlan;
        token.credits = user.credits;
      }
      return token;
    },
  
    async session({ session, token }) {
      if (token) {
        // Set basic user info from the token
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.username = token.username as string;
        session.user.subscriptionPlan = token.subscriptionPlan as string;
        session.user.credits = token.credits as number;
  
        // Fetch the latest user data from the database
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
        });
  
        // Update session if the user is found in the database
        if (dbUser) {
          session.user.name = dbUser.name;
          session.user.image = dbUser.image;
          session.user.username = dbUser.username;
          session.user.subscriptionPlan = dbUser.subscriptionPlan;
          session.user.credits = dbUser.credits;
        }
      }
  
      console.log("Updated session:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
})