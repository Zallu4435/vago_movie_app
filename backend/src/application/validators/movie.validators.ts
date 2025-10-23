import { z } from 'zod';

export const searchMoviesSchema = z.object({
  q: z
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query is too long'),
  page: z
    .string()
    .optional()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Page must be greater than 0')
    .refine((val) => val <= 100, 'Page must be less than or equal to 100'),
});

export type SearchMoviesInput = z.infer<typeof searchMoviesSchema>;
