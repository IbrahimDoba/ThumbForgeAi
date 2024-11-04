import { notFound } from 'next/navigation'
import { db } from "@/lib/db"
import { users, generatedImages } from "@/lib/db/schema"
import { eq } from 'drizzle-orm'

import UserProfileComponent from './UserProfileComponent'
import getSession from '@/lib/getSession'

export default async function UserProfilePage({ params }: { params: { slug: string } }) {

  // const router = useRouter();
const session = await getSession();
  const user = await db.query.users.findFirst({
where: eq(users.username, params.slug),
with: {
  generatedImages: {
    orderBy: (generatedImages, { desc }) => [desc(generatedImages.createdAt)],
  },
},
})

if (!user) {
notFound()
}


  const isOwnProfile = session?.user?.id === user.id

  return <UserProfileComponent user={user} isOwnProfile={isOwnProfile} />
}

