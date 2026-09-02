import z from "zod";
import {
  generalSettingDataResponseSchema,
  generalSettingResponseSchema,
  generalSettingSchema,
  generalSettingUpdateSchema,
} from "../schemas/general-setting";

export type GeneralSetting = z.infer<typeof generalSettingSchema>;

export type GeneralSettingUpdateBody = z.infer<
  typeof generalSettingUpdateSchema
>["body"];

export type GeneralSettingUpdateParams = z.infer<
  typeof generalSettingUpdateSchema
>["params"];

export type GeneralSettingResponse = z.infer<
  typeof generalSettingResponseSchema
>;

export type GeneralSettingDataResponse = z.infer<
  typeof generalSettingDataResponseSchema
>;
