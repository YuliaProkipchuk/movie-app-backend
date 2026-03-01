import { NextFunction, Router, Response } from "express";
import { authentication } from "../middlewares/authentications";
import { validate } from "../middlewares/validator";
import { movieEdits, movieFavoriteStatus, movieInputs, movieRatingInput } from "../schemas/movieSchema";
import { addMovie, deleteMovie, editMovie, getByID, rateMovie, toggleFavorite } from "../controllers/movie";

const router = Router();

router.use(authentication);

router.get("/:id", getByID);

router.post("/", validate(movieInputs), addMovie);

router.put("/:id", validate(movieEdits), editMovie);

router.patch("/:id/favorite", validate(movieFavoriteStatus), toggleFavorite);
router.patch("/:id/rating", validate(movieRatingInput), rateMovie);

router.delete("/:id", deleteMovie);

export default router;