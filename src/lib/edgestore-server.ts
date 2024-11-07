import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { initEdgeStore } from '@edgestore/server'
import { z } from 'zod'

const es = initEdgeStore.create()

const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    .input(
      z.object({
        userPrompt: z.string(),
        imageType: z.string(),
        aspectRatio: z.string(),
        colorPalette: z.string(),
        enhancePrompt: z.boolean(),
        generatedAt: z.string(),
      })
    )
    .path(({ input }) => [
      { name: 'public', type: 'folder' },
      { name: input.imageType, type: 'folder' },
      { name: input.generatedAt, type: 'file' },
    ]),
})

export type EdgeStoreRouter = typeof edgeStoreRouter

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})