import { Router } from "express";
import { validateSchema } from "../middlewares";
import { userSignInSchema } from "../schemas";

const router = Router();

router.post("/sign-in", validateSchema(userSignInSchema));

export default router;
