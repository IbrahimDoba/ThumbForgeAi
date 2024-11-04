import { eq, desc } from 'drizzle-orm';
import { generatedImages } from '@/lib/db/schema';
import { db } from '@/lib/db';

export async function getImageDetails(imageId: string) {
  try {
    const image = await db.query.generatedImages.findFirst({
      where: eq(generatedImages.imageId, imageId),
      with: {
        user: true,
      },
    });

    if (!image) {
      return { error: 'Image not found' };
    }

    const otherUserImages = await db.query.generatedImages.findMany({
      where: eq(generatedImages.userId, image.userId),
      with: {
        user: true,
      },
      orderBy: [desc(generatedImages.createdAt)],
      limit: 8,
    });

    return { image, otherUserImages };
  } catch (error) {
    console.error('Failed to fetch image details:', error);
    return { error: 'Failed to fetch image details.' };
  }
}