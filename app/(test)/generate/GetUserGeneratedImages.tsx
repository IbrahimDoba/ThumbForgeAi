// GetUserGeneratedImages.tsx

import { desc, eq } from 'drizzle-orm';
import { generatedImages } from '@/lib/db/schema';
import { db } from '@/lib/db';
import getSession from '@/lib/getSession';
// import { getSession } from 'next-auth/react';

export const revalidate = 0; // disable cache for this route

export async function getUserGeneratedImages() {
  const session = await getSession();

  if (!session || !session.user) {
    return { userImages: [], error: 'Please log in to generate images.' };
  }

  try {
    const images = await db.query.generatedImages.findMany({
      where: eq(generatedImages.userId, session.user.id),
      orderBy: [desc(generatedImages.createdAt)],
      limit: 20,
      with: {
        user: true,
      },
    });

    return { images };
  } catch (error) {
    console.error('Failed to fetch user images:', error);
    return { userImages: [], error: 'Failed to fetch user images.' };
  }
}
