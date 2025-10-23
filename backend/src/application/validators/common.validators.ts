import { z } from 'zod';

export const paginationSchema = z.object({
  page: z
    .number()
    .int('Page must be an integer')
    .positive('Page must be positive')
    .max(100, 'Page must be less than or equal to 100')
    .default(1),
  limit: z
    .number()
    .int('Limit must be an integer')
    .positive('Limit must be positive')
    .max(50, 'Limit must be less than or equal to 50')
    .default(10),
});

export const idParamSchema = z.object({
  id: z
    .string()
    .uuid('Invalid ID format'),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
