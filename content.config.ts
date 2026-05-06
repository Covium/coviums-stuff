import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export const collectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().url().optional(),
  provider: z.string().optional(),
  id: z.string().optional(),
});

export const modSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().url().optional(),
  provider: z.string().optional(),
  id: z.number().optional(),
});

export const gameSchema = z.object({
  name: z.string(),
  sort: z.string(),
  slug: z.string(),
  collections: z.array(collectionSchema),
  mods: z.array(modSchema),
});

export default defineContentConfig({
  collections: {
    mods: defineCollection({
      source: 'mods/*.md',
      type: 'page',
      schema: gameSchema,
    }),
  },
});
