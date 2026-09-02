import z from "zod";
import { messageResponseSchema } from "../routes/custom.schema";

export const generalSettingSchema = z.object({
  id: z.number(),
  titleStart: z
    .string({
      invalid_type_error: "El titulo debe ser una cadena de texto",
    })
    .min(1, { message: "El titulo es requerido" }),
  descriptionStart: z
    .string({
      invalid_type_error: "La descripcion debe ser una cadena de texto",
    })
    .min(1, { message: "La descripcion es requerida" }),
  socialLinks: z
    .array(
      z.object({
        key: z.string({ message: "La clave de red social es requerida" }),
        url: z
          .string({ message: "La URL debe ser texto" })
          .url({ message: "Debe ser una URL válida" }),
      }),
    )
    .optional(),
  banners: z
    .array(
      z.object({
        id: z.number({ message: "El ID es requerido" }),
        image: z
          .string({ message: "La imagen es requerida" })
          .min(1, { message: "La imagen no puede estar vacía" }),
        active: z.boolean({ message: "El estado activo debe ser un booleano" }),
      }),
    )
    .refine((banners) => banners.some((banner) => banner.active), {
      message: "Debe haber al menos un banner activo para el slider.",
    })
    .optional(),
});

export const generalSettingUpdateSchema = z.object({
  params: z.object({
    // Aquí transformamos el string de la URL a número para que coincida perfectamente con el modelo
    id: z.string().transform((val, ctx) => {
      const parsed = Number(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: "custom",
          message: "El ID debe ser un numero valido",
        });
        return z.NEVER;
      }
      if (parsed <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "El ID debe ser mayor a cero",
        });
        return z.NEVER;
      }
      return val;
    }),
  }),
  body: generalSettingSchema.omit({ id: true }).partial(),
});

export const generalSettingResponseSchema = generalSettingSchema.pick({
  id: true,
  titleStart: true,
  descriptionStart: true,
  socialLinks: true,
  banners: true,
});

export const generalSettingDataResponseSchema = z.object({
  generalSetting: generalSettingResponseSchema,
  success: messageResponseSchema.shape.success,
});
