import { Router } from "express";
import { validate } from "../middlewares/validator";
import { signinSchema, signupSchema } from "../schemas/authSchema";

const router = Router();

router.post("/signin", validate(signinSchema), () => {});
router.post("/signup", validate(signupSchema), () => {});
router.post("/refresh", () => {});

export default router;
