import { notFound } from 'next/navigation';
import { getImageDetails } from '../getImageDetails';
import ImageDetailComponent from '@/components/generator/ImageDetailComponent';


export default async function ImageDetailPage({ params }: { params: { imageId: string } }) {
  const { image, otherUserImages, error } = await getImageDetails(params.imageId);

  if (error === 'Image not found') {
    notFound();
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ImageDetailComponent image={image} otherUserImages={otherUserImages} />;
}