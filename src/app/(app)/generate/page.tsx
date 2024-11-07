import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import GeneratorModal from '@/components/generator/Generator.Modal';
import { getUserGeneratedImages } from './GetUserGeneratedImages';
import GalleryComponent from '@/components/generator/GalleryComponent';

export default async function GeneratePage() {
  const { images, error } = await getUserGeneratedImages();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-[80%] mx-auto">
      <h1 className="text-4xl font-bold mb-8">ThumbForge AI Generator</h1>
      <GeneratorModal />
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Generations</h2>
          <Link href="/gallery" passHref>
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading your images...</div>}>
          <GalleryComponent images={images} />
        </Suspense>
      </div>
    </div>
  );
}
