import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  userId: z.string(),
  createdAt: z.date().optional(),
});

const BookZodSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    genre: z.string().min(1),
    publicationDate: z.date(),
    reviews: z.array(reviewSchema).optional(),
  }),
});

export const BookValidation = {
  BookZodSchema,
};
