import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types/Request";
import { createMovie, deleteById, getMovie, toggleMovieFavorite, updateMovie, updateMovieRating } from "../services/movie";
import { MovieEdit, MovieInput } from "../types/Movie";
import { ApiError } from "../types/ApiError";

export const getByID = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  const id = req.params.id as string
  try {
    if (!userId) {
      throw new ApiError('Unauthorized', 401)
    }
    const movie = await getMovie(userId, id)
    res.status(200).json({
      status: 'success',
      message: 'Fetched movie successfully',
      data: movie
    })
  } catch (error) {
    next(error)
  }
}
export const addMovie = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const data = req.body
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "Unathorized Request",
      });
    }
    const movie = await createMovie(data as MovieInput, userId);
    res.status(201).json({
      status: 'success',
      message: 'Movie added successfully',
      data: movie
    })
  } catch (error) {
    next(error)
  }
};
export const editMovie = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movieId = req.params.id as string;
    const userId: string = req.user?.id as string
    const updatedMovie = await updateMovie(userId, movieId, req.body as MovieEdit);
    return res.status(200).json({
      status: 'success',
      message: `The movie ${updatedMovie.title} is updated`
    })
  } catch (error) {
    next(error)
  }
}
export const toggleFavorite = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { isFavorite } = req.body;
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
export const rateMovie = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rating } = req.body;
    const movieId = req.params.id as string;
    const userId: string = req.user?.id as string
    const updatedMovie = await updateMovieRating(rating, userId, movieId);
    return res.status(200).json({
      status: 'success',
      message: `The movie ${updatedMovie.title} is rated ${rating}`
    })
  }
  catch (error) {
    next(error);
  }
}