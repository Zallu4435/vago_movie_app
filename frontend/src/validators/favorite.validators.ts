import { z } from 'zod';

export const toggleFavoriteSchema = z.object({
  imdbID: z
    .string()
    .min(1, 'IMDB ID is required')
    .regex(/^tt\d{7,10}$/, 'Invalid IMDB ID format'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title is too long'),
  year: z
    .string()
    .min(1, 'Year is required'),
  poster: z
    .string()
    .min(1, 'Poster is required'),
  type: z
    .string()
    .min(1, 'Type is required'),
});

export type ToggleFavoriteInput = z.infer<typeof toggleFavoriteSchema>;
