import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend User type with additional fields
export type ExtendedUser = User & {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
  username: string;
  subscriptionPlan: string;
  credits: number;
};

// Extend JWT interface to include additional fields
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    username: string;
    image: string;
    subscriptionPlan: string;
    credits: number;
  }
}

// Extend Session interface to include the ExtendedUser
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}