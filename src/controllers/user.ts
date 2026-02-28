import { Request, Response, NextFunction } from "express";
import { fetchUserMovies } from "../services/user";
import { MovieQuery } from "../types/Movie";
import { RequestWithUser } from "../types/Request";
import { ApiError } from "../types/ApiError";

export const getUserMovies = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const { q, genres, cursor, actors, director, favorite } = req.query as MovieQuery;
  const userId = req.user?.id
  if (!userId) {
    throw new ApiError('Unathorized', 401)
  }
  const genresData = Array.isArray(genres) 
  ? genres 
  : genres ? [genres] : undefined
  const actorsData = Array.isArray(actors) 
  ? actors 
  : actors ? [actors] : undefined
  try {
    const result = await fetchUserMovies(userId, { q, genres:genresData, cursor, actors:actorsData, director, favorite });
    res.status(200).json({
      status: "success",
      message: "Movies fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
