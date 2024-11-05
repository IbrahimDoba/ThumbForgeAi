"use client"
import Image from 'next/image';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Download, Share, FileText } from 'lucide-react';
import { ImageCard } from '@/components/generator/ImageCard';
import { GeneratedImage, User } from '@/lib/db/schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

interface ImageDetailComponentProps {
  image: GeneratedImage & { user: User };
  otherUserImages: (GeneratedImage & { user: User })[];
}

export default function ImageDetailComponent({ image, otherUserImages }: ImageDetailComponentProps) {
    const router = useRouter();
    const [isPromptExpanded, setPromptExpanded] = useState(false);
    const [isMagicPromptExpanded, setMagicPromptExpanded] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Large Image */}
        <div>
          <Image
            src={image.imageUrl}
            alt={`Generated thumbnail: ${image.prompt}`}
            width={1200}
            height={1200}
            layout="responsive"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right side - Image Information */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
          <Link href={`/user/${image?.user.username}`}>

            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={image.user.image || undefined} alt={image.user.name || 'User'} />
                <AvatarFallback>{image.user.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{image.user.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Created on {format(new Date(image.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Describe</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Prompt</h3>
            <p className="line-clamp-4">
              {isPromptExpanded ? image.prompt : `${image.prompt.slice(0, 250)}...`}
            </p>
            {image.prompt.length > 250 && (
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setPromptExpanded(!isPromptExpanded)}
              >
                {isPromptExpanded ? "Read less" : "Read more"}
              </Button>
            )}
          </div>

           {/* Magic Prompt - Only show if `enhancePrompt` is true */}
           {image.enhancePrompt === 'true' && (
            <div className="space-y-2">
              <h3 className="font-semibold">Magic Prompt</h3>
              <p className="line-clamp-4">
                {isMagicPromptExpanded ? image.enhancedPrompt : `${image?.enhancedPrompt!.slice(0, 250)}...`}
              </p>
              {image?.enhancedPrompt!.length > 250 && (
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => setMagicPromptExpanded(!isMagicPromptExpanded)}
                >
                  {isMagicPromptExpanded ? "Read less" : "Read more"}
                </Button>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Enhanced</h4>
              <p>{image.enhancePrompt === 'true' ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <h4 className="font-semibold">Style</h4>
              <p>{image.imageType}</p>
            </div>
            <div>
              <h4 className="font-semibold">Resolution</h4>
              <p>{image.aspectRatio}</p>
            </div>
            <div>
              <h4 className="font-semibold">Date Created</h4>
              <p>{format(new Date(image.createdAt), 'PP')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other images by the same user */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">More by {image.user.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherUserImages.map((otherImage) => (
            <ImageCard key={otherImage.id} image={otherImage} user={otherImage.user} onClick={() => router.push(`/image/${otherImage.imageId}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}