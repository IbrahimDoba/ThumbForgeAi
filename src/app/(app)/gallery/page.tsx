import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import GalleryComponent from '@/components/generator/GalleryComponent';
import { getAllGeneratedImages } from './getAllGeneratedImages';


export default async function GalleryPage() {
  const { images, error } = await getAllGeneratedImages();

  if (error) {
    return <div>{error}</div>;
  }

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