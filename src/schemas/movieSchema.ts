import z from "zod";
import { MovieStatus } from "../generated/prisma/enums";

export const movieInputs = z
  .object({
    title: z.string().min(1, "Title required"),
    description: z.string().optional(),
    image: z.url().optional(),
    director: z.string().optional(),
    rating: z.coerce.number().min(1).max(10).optional(),
    isFavorite: z.boolean().optional(),
    genre: z.array(z.string()).optional(),
    actors: z.array(z.string()).optional(),
    release_date: z.string().optional(),
    status: z.enum(MovieStatus).optional().default(MovieStatus.PLANNED)
  })
  .strict();

export const movieFavoriteStatus = z.object({
  isFavorite: z.boolean()
})