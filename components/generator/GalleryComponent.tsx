"use client";

import { useState } from "react";
import Image from "next/image";
// import { GeneratedImage } from '@/db/schema'
import { format } from "date-fns";

import { GeneratedImage } from "@/lib/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryComponentProps {
  images: GeneratedImage[];
}

export default function GalleryComponent({
  images: initialImages,
}: GalleryComponentProps) {
  const [images] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
    null,
  );

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <Card
            key={image.id}
            className="cursor-pointer overflow-hidden"
            onClick={() => handleImageClick(image)}
          >
            <CardContent className="relative p-0">
              <Image
                src={image.imageUrl}
                alt={`Generated thumbnail: ${image.prompt}`}
                width={800}
                height={800}
                layout="responsive"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center text-white">
                  <Avatar className="mr-2 h-8 w-8">
                    {/* <AvatarImage src="/placeholder-avatar.jpg" alt="User" /> */}
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Username</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="hidden">{selectedImage?.id}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src={selectedImage?.imageUrl!}
                alt={`Generated thumbnail: ${selectedImage?.prompt}`}
                width={1200}
                height={1200}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Avatar className="mr-2 h-10 w-10">
                  {/* <AvatarImage src="/placeholder-avatar.jpg" alt="User" /> */}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-lg font-medium">Username</span>
              </div>
              <Button variant="outline" className="w-full">
                AI Image to Text
              </Button>
              <div>
                <h3 className="mb-2 font-semibold">Prompt</h3>
                <p className="line-clamp-4">{selectedImage?.prompt}</p>
                {/* <Button variant="link" className="p-0 h-auto">Read more</Button> */}
              </div>
              {selectedImage?.enhancePrompt === "true" ? (
                <div>
                  <h3 className="mb-2 font-semibold">Enhanced Prompt</h3>
                  <p className="line-clamp-4">Yes</p>
                  {/* <Button variant="link" className="p-0 h-auto">Read more</Button> */}
                </div>
              ) : (
                <div>
                  <h3 className="mb-2 font-semibold">Enhanced Prompt</h3>
                  <p className="line-clamp-4">No</p>
                </div>
              )}
              <div className="text-sm text-gray-500">
                <p>
                  Created:{" "}
                  {selectedImage?.createdAt &&
                    format(new Date(selectedImage.createdAt), "PPP")}
                </p>
                <p>Resolution: {selectedImage?.aspectRatio}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
