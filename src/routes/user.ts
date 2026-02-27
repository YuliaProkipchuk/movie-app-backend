import { Router } from "express";
import { getUserMovies } from "../controllers/user";

const router = Router();

router.get(
  "/movies",
  getUserMovies
);

export default router;
