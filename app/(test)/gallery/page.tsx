import GalleryComponent from '@/components/generator/GalleryComponent';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { generatedImages } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 0; // disable cache for this route

async function getGeneratedImages() {
  try {
    const images = await db.select().from(generatedImages).orderBy(desc(generatedImages.createdAt)).limit(50);
    return images;
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGeneratedImages();

  return (
    <div className="container mx-auto py-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">ThumbForge Gallery</h1>
      <Link href="/generate" passHref>
        <Button variant="outline">Back to Generator</Button>
      </Link>
    </div>
    <Suspense fallback={<div>Loading gallery...</div>}>
      <GalleryComponent images={images} />
    </Suspense>
  </div>
  );
}