// schemas/entrySchema.ts
import { z } from 'zod';

export const ValidationEntrySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title is required')
    .max(30, 'Please enter less than 30 characters'),
  date: z.string().min(1, 'Date is required'),
  city: z
    .string()
    .trim()
    .min(3, 'City is required')
    .max(30, 'Please enter less than 30 characters'),
  country: z
    .string()
    .trim()
    .min(3, 'Country is required')
    .max(30, 'Please enter less than 30 characters'),
  image: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'Image size must be less than 5MB',
  }),
  description: z
    .string()
    .trim()
    .min(3, 'Description is required')
    .max(500, 'Please enter less than 500 characters'),
});

export type EntrySchemaType = z.infer<typeof ValidationEntrySchema>;
