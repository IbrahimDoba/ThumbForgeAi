import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { generatedImages, users } from "@/lib/db/schema";
import getSession from "@/lib/getSession";

import UserProfileComponent from "./UserProfileComponent";

export default async function UserProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  // const router = useRouter();
  const session = await getSession();

  if (!params || !params.slug) {
        // Handle the case where slug is missing
    notFound();
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, params.slug),
    with: {
      generatedImages: {
        orderBy: (generatedImages, { desc }) => [
          desc(generatedImages.createdAt),
        ],
      },
    },
  });

  if (!user) {
    notFound();
  }

  const isOwnProfile = session?.user?.id === user.id;

  return <UserProfileComponent user={user} isOwnProfile={isOwnProfile} />;
}
