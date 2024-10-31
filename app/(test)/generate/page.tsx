import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

import { desc } from 'drizzle-orm'
import { generatedImages } from '@/lib/schema'
import { db } from '@/lib/db'
import GeneratorModal from '@/components/generator/Generator.Modal'
import GalleryComponent from '@/components/generator/GalleryComponent'

export const revalidate = 0 // disable cache for this route

async function getRecentGeneratedImages() {
  try {
    const images = await db.select().from(generatedImages).orderBy(desc(generatedImages.createdAt)).limit(8)
    return images
  } catch (error) {
    console.error('Failed to fetch recent images:', error)
    return []
  }
}

export default async function Home() {
  const recentImages = await getRecentGeneratedImages()

  return (
    <div className="w-full max-w-[80%] mx-auto">
      <h1 className="text-4xl font-bold mb-8">ThumbForge AI Genrator</h1>
      <GeneratorModal />
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Generations</h2>
          <Link href="/gallery" passHref>
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading recent images...</div>}>
          <GalleryComponent images={recentImages} />
        </Suspense>
      </div>
    </div>
  )
}