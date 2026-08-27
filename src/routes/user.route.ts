import { Router } from "express";

import {
  userForgotPasswordSchema,
  userSignInSchema,
  userVerifyResetTokenSchema,
} from "../schemas";
import { UserController } from "../controllers";
import { UserMiddleware, ValidationMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/sign-in",
  ValidationMiddleware.validateSchema(userSignInSchema),
  UserController.signIn,
);

router.get("/profile", UserMiddleware.verifyToken, UserController.getProfile);

router.post(
  "/forgot-password",
  ValidationMiddleware.validateSchema(userForgotPasswordSchema),
  UserController.forgotPassword,
);

router.get(
  "/verify-reset-token/:token",
  ValidationMiddleware.validateSchema(userVerifyResetTokenSchema),
  UserController.verifyResetToken,
);

export default router;
