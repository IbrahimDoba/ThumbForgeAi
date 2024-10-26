import { db } from "@/lib/db";
import { users } from "./schema";
import { eq } from "drizzle-orm/expressions"; 

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select({
        name: users.name,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute();

    return user[0] || null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute();

    return user[0] || null;
  } catch {
    return null;
  }
};
