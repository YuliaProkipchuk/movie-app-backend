import { MovieStatus } from "../generated/prisma/enums";

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

export type MovieInput = {
  title: string;
  image?: string;
  rating?: number;
  release_date?: Date;
  description?: string;
  director?: string;
  actors?: string[];
  genre?: string[];
  isFavorite?: boolean;
  status?: MovieStatus
};