import { Router } from "express";
import { ValidationMiddleware } from "../middlewares";
import { generalSettingUpdateSchema } from "../schemas/general-setting";
import { GeneralSettingController } from "../controllers";

const router = Router();

router.get("/", GeneralSettingController.getData);
router.patch(
  "/:id",
  ValidationMiddleware.validateSchema(generalSettingUpdateSchema),
  GeneralSettingController.update,
);

export default router;
