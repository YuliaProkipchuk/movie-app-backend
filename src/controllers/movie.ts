import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types/Request";
import { createMovie, deleteById, toggleMovieFavorite } from "../services/movie";
import { Movie, MovieInput } from "../types/Movie";

export const addMovie = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const data: MovieInput = req.body
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "Unathorized Request",
      });
    }
    const movie = await createMovie(data, userId);
    res.status(201).json({
      status: 'success',
      message: 'Movie added successfully',
      data: movie
    })
  } catch (error) {
    next(error)
  }
};
export const toggleFavorite = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isFavorite = req.body;
    const movieId = req.params.id as string;
    const userId: string = req.user?.id as string
    const updatedMovie = await toggleMovieFavorite(isFavorite, userId, movieId);
    return res.status(200).json({
      status: 'success',
      message: `${isFavorite ? 'Liked' : 'Unliked'} the movie ${updatedMovie.title}`
    })
  } catch (error) {
    next(error)
  }
}
export const deleteMovie = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id: string = req.params.id as string;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "Unathorized Request",
      });
    }
    await deleteById(id, userId);
    return res.status(204).json({
      status: "success",
      message: "Movie deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
