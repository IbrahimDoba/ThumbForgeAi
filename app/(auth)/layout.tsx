// import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import getSession from '@/lib/getSession';

// import { getCurrentUser } from "@/lib/session";

// interface AuthLayoutProps {
//   children: React.ReactNode;
// }

export default async function AuthLayout({ children }) {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect('/generate');

  return <div className="min-h-screen">{children}</div>;
}
