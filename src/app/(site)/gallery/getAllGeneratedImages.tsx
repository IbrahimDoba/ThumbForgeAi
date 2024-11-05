import { desc } from 'drizzle-orm';
import { generatedImages } from '@/lib/db/schema';
import { db } from '@/lib/db';

export const revalidate = 0; // disable cache for this route

export async function getAllGeneratedImages() {
  try {
    const images = await db.query.generatedImages.findMany({
      orderBy: [desc(generatedImages.createdAt)],
      limit: 50,
      with: {
        user: true,
      },
    });
    return { images };
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return { images: [], error: 'Failed to fetch images.' };
  }
}