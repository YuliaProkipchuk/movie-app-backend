import z from "zod";
import { MovieStatus } from "../generated/prisma/enums";

export const movieInputs = z
  .object({
    title: z.string().min(1, "Title required"),
    description: z.string().optional(),
    image: z.url().optional(),
    director: z.string().optional(),
    rating: z.coerce.number().min(0).max(10).optional().default(0),
    isFavorite: z.boolean().optional(),
    genres: z.array(z.string()).optional().default([]),
    actors: z.array(z.string()).optional().default([]),
    releasedAt: z.coerce.date().optional(),
    status: z.enum(MovieStatus).optional().default(MovieStatus.PLANNED)
  })
  .strict();
export const movieEdits = z
  .object({
    title: z.string().min(1, "Title required"),
    description: z.string().optional(),
    image: z.url().optional(),
    director: z.string().optional(),
    rating: z.coerce.number().min(0).max(10).optional().default(0),
    isFavorite: z.boolean().optional(),
    genres: z
    .array(z.string()).optional(),
    actors: z
      .array(z.string()).optional(),
    releasedAt: z.coerce.date().optional(),
    status: z.enum(MovieStatus).optional().default(MovieStatus.PLANNED)
  })

export const movieFavoriteStatus = z.object({
  isFavorite: z.boolean()
})

export const movieRatingInput = z.object({
  rating: z.coerce.number().min(1).max(10)
})

export const moviesQuery = z.object({
  q: z.string().optional(),
  genres: z
    .preprocess((val) => {
      if (typeof val === "string") return [val];
      if (Array.isArray(val)) return val;
      return undefined;
    }, z.array(z.string()))
    .optional(),
  actors: z
    .preprocess((val) => {
      if (typeof val === "string") return [val];
      if (Array.isArray(val)) return val;
      return undefined;
    }, z.array(z.string()))
    .optional(),
  director: z.string().optional(),
  favorite: z.coerce.boolean().optional(),
  cursor: z.string().optional()
})