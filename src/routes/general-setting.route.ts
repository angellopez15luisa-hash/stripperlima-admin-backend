import { Router } from "express";
import { UserMiddleware, ValidationMiddleware } from "../middlewares";
import { generalSettingUpdateSchema } from "../schemas/general-setting";
import { GeneralSettingController } from "../controllers";
import { userVerifyResetTokenSchema } from "../schemas";

const router = Router();

router.use(UserMiddleware.verifyToken);

router.get("/", GeneralSettingController.getData);
router.patch(
  "/:id",
  ValidationMiddleware.validateSchema(generalSettingUpdateSchema),
  GeneralSettingController.update,
);

export default router;
