"use client";

import { useRouter } from 'next/navigation';
import { ImageCard } from '@/components/generator/ImageCard';
import { GeneratedImage, User } from '@/lib/db/schema';

interface GalleryComponentProps {
  images: (GeneratedImage & { user: User })[];
}

export default function GalleryComponent({ images }: GalleryComponentProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          user={image.user}
          onClick={() => router.push(`/image/${image.imageId}`)}
        />
      ))}
    </div>
  );
}