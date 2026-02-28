import { Router } from "express";
import { getUserMovies } from "../controllers/user";
import { authentication } from "../middlewares/authentications";
import { validate } from "../middlewares/validator";
import { moviesQuery } from "../schemas/movieSchema";

const router = Router();

router.get(
  "/movies",
  authentication,
  validate(moviesQuery, 'query'),
  getUserMovies
);

export default router;
