import z from "zod";
import { movieEdits, movieInputs, moviesQuery } from "../schemas/movieSchema";

export type Movie = {
  id: string;
  title: string;
  image: string;
  rating: number;
  release_date: Date;
  description?: string;
  director: string;
  actors: string[];
  genre: string[];
  isFavorite: boolean;
};

export type MovieInput = z.infer<typeof movieInputs>;
export type MovieEdit = z.infer<typeof movieEdits>;
export type MovieQuery = z.infer<typeof moviesQuery>;