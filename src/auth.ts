import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, users } from "./lib/db/schema"
import { generateUsername } from "./lib/services"
import NextAuth, { User } from "next-auth"
import { db } from "./lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
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
        } as User;
      },
    }),
  ],
  
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        
        token.subscriptionPlan = user.subscriptionPlan
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.subscriptionPlan = token.subscriptionPlan as string
      }
      console.log("session here",session)

      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
