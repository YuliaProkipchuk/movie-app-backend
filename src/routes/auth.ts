import { Router } from "express";
import { validate } from "../middlewares/validator";
import { signinSchema, signupSchema } from "../schemas/authSchema";
import {
  logoutController,
  refreshController,
  signInController,
  signUpController,
} from "../controllers/auth";
import { authentication } from "../middlewares/authentications";

const router = Router();

router.post("/signin", validate(signinSchema), signInController);
router.post("/signup", validate(signupSchema), signUpController);
router.post("/refresh", refreshController);
router.post("/logout", authentication, logoutController);

export default router;
