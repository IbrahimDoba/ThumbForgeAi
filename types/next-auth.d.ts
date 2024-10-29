import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

 export const UsersRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type ExtendedUser = User & {
  role: UserRole;
};

declare module "next-auth/jwt" {
  interface JWT {
    role: UsersRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
