import { NextFunction, Router, Response } from "express";
import { authentication } from "../middlewares/authentications";
import { validate } from "../middlewares/validator";
import { movieFavoriteStatus, movieInputs } from "../schemas/movieSchema";
import { addMovie, deleteMovie, editMovie, getByID, toggleFavorite } from "../controllers/movie";
import { RequestWithUser } from "../types/Request";

const router = Router();

router.use(authentication);

router.get("/", async (req: RequestWithUser, res: Response, next: NextFunction) => {
    return res.status(200).send('success')
});
router.get("/:id", getByID);
router.post("/", validate(movieInputs), addMovie);
router.put("/:id", validate(movieInputs), editMovie);
router.patch("/:id", validate(movieFavoriteStatus), toggleFavorite);
router.delete("/:id", deleteMovie);

export default router;