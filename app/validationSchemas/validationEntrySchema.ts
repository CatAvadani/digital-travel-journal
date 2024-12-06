import { z } from 'zod';

export const ValidationEntrySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Please enter minimum 3 characters')
    .max(30, 'Please enter less than 30 characters'),
  date: z.string().min(1, 'Date is required'),
  city: z
    .string()
    .trim()
    .min(3, 'Please enter minimum 3 characters')
    .max(30, 'Please enter less than 30 characters'),
  country: z
    .string()
    .trim()
    .min(3, 'Please enter minimum 3 characters')
    .max(30, 'Please enter less than 30 characters'),
  image: z
    .union([z.instanceof(File), z.string().min(0), z.null(), z.undefined()])
    .refine(
      (file) =>
        typeof file === 'string' ||
        file === null ||
        file === undefined ||
        file.size <= 5 * 1024 * 1024,
      {
        message: 'Image size must be less than 5MB',
      }
    ),
  description: z
    .string()
    .trim()
    .min(3, 'Please enter minimum 3 characters')
    .max(500, 'Please enter less than 500 characters'),
});

export type EntrySchemaType = z.infer<typeof ValidationEntrySchema>;
