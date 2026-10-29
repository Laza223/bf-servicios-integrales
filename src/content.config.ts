import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/servicios' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      group: z.enum(['industria', 'seguridad', 'hogar']),
      name: z.string(),
      icon: z.string(),
      // SEO
      title: z.string().max(65),
      description: z.string().max(160),
      h1: z.string(),
      lead: z.string(),
      summary: z.string(),
      serviceType: z.string(),
      image: image(),
      imageAlt: z.string(),
      waMessage: z.string(),
      ctaLabel: z.string().default('Pedir visita sin cargo'),
      items: z.array(z.object({ title: z.string(), text: z.string() })),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })),
      related: z.array(z.string()),
    }),
});

export const collections = { servicios };
