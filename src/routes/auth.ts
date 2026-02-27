import { Router } from "express";
import { validate } from "../middlewares/validator";
import { signinSchema, signupSchema } from "../schemas/authSchema";
import {
  refreshController,
  signInController,
  signUpController,
} from "../controllers/auth";

const router = Router();

router.post("/signin", validate(signinSchema), signInController);
router.post("/signup", validate(signupSchema), signUpController);
router.post("/refresh", refreshController);

export default router;
