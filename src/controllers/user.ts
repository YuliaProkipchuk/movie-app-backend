import { Request, Response, NextFunction } from "express";
import { fetchUserMovies } from "../services/user";

export const getUserMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { q, rating, genre, cursor } = req.query;
  const genres = typeof genre === "string" ? [genre] : genre;
  const ratings = typeof rating === "string" ? [rating] : genre;
  try {
    const movies = await fetchUserMovies("1");
    res.status(200).json({
      status: "success",
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};
