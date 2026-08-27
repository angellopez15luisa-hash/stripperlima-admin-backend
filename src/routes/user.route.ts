import { Router } from "express";

import { userSignInSchema } from "../schemas";
import { UserController } from "../controllers";
import { ValidationMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/sign-in",
  ValidationMiddleware.validateSchema(userSignInSchema),
  UserController.signIn,
);

router.get("/profile");

export default router;
