import { z } from 'zod';

export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, 'Search query is required')
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query is too long'),
  page: z
    .number()
    .int()
    .positive()
    .max(100)
    .optional()
    .default(1),
});

export const movieSchema = z.object({
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

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type MovieInput = z.infer<typeof movieSchema>;
