import { NextFunction, Request, Response } from "express";
import { GeneralSettingService } from "../services";

import {
  GeneralSettingDataResponse,
  GeneralSettingUpdateBody,
  GeneralSettingUpdateParams,
  MessageResponse,
} from "../types";

export class GeneralSettingController {
  static getData = async (
    req: Request,
    res: Response<GeneralSettingDataResponse>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const generalSetting = await GeneralSettingService.getData();
      res.status(200).json({
        generalSetting,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (
    req: Request<GeneralSettingUpdateParams, {}, GeneralSettingUpdateBody>,
    res: Response<MessageResponse>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const message = await GeneralSettingService.update(
        Number(req.params.id),
        req.body,
      );
      res.status(200).json({
        message,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
