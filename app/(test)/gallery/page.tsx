'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useInView } from 'react-intersection-observer'
import { EdgeStoreProvider, useEdgeStore } from '@/lib/edgestore'

function GalleryContent() {
  const [images, setImages] = useState([])
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const { edgestore } = useEdgeStore()

  useEffect(() => {
    if (inView) {
      loadMoreImages()
    }
  }, [inView])

  const loadMoreImages = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const { data, cursor: newCursor } = await edgestore.myPublicImages.list({
        limit: 20,
        cursor: cursor,
      })

      setImages((prevImages) => [...prevImages, ...data])
      setCursor(newCursor)
      setHasMore(!!newCursor)
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Generated Thumbnails</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image: any) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={image.url}
                alt={`Generated thumbnail`}
                width={300}
                height={300}
                layout="responsive"
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="p-2">
              <Button onClick={() => handleDownload(image.url)} variant="outline" size="sm" className="w-full">
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {isLoading && <p className="text-center mt-4">Loading more images...</p>}
      {!isLoading && hasMore && (
        <div ref={ref} className="text-center mt-4">
          <Button onClick={loadMoreImages}>Load More</Button>
        </div>
      )}
    </div>
  )
}

export default function GalleryPage() {
  return (
    <EdgeStoreProvider>
      <GalleryContent />
    </EdgeStoreProvider>
  )
}