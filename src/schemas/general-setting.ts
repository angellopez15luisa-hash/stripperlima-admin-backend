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

  // --- NUEVOS CAMPOS DE LA SECCIÓN ARON ---
  titleAron: z
    .string({ invalid_type_error: "El título de Aron debe ser texto" })
    .min(1, { message: "El título de Aron es requerido" }),

  subtitleAron: z
    .string({ invalid_type_error: "El subtítulo de Aron debe ser texto" })
    .min(1, { message: "El subtítulo de Aron es requerido" }),
  titleEditorAron: z
    .string({ invalid_type_error: "El titulo debe ser texto" })
    .min(1, { message: "El titulo es requerida" }),
  descriptionEditorAron: z
    .string({ invalid_type_error: "La descripción debe ser texto" })
    .min(1, { message: "La descripción es requerida" }),

  listLabelsEditorAron: z
    .array(
      z.object({
        id: z.number({ message: "El ID de la viñeta es requerido" }),
        text: z
          .string({ message: "El texto de la viñeta es requerido" })
          .min(1, { message: "La viñeta no puede estar vacía" }),
      }),
    )
    .min(1, { message: "Debe haber al menos una viñeta" }),

  textHtmlEditorAron: z
    .string({ invalid_type_error: "El contenido HTML debe ser texto" })
    .min(1, { message: "El contenido HTML es requerido" }),

  galeryImagesAron: z
    .array(
      z.object({
        id: z.number({ message: "El ID de la imagen es requerido" }),
        url: z
          .string({ message: "La URL de la imagen debe ser texto" })
          .min(1, { message: "La URL de la imagen es requerida" }),
      }),
    )
    .min(1, { message: "Debe haber al menos una imagen en la galería" }),
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
  titleAron: true,
  subtitleAron: true,
  titleEditorAron: true,
  descriptionEditorAron: true,
  listLabelsEditorAron: true,
  textHtmlEditorAron: true,
  galeryImagesAron: true,
});

export const generalSettingDataResponseSchema = z.object({
  generalSetting: generalSettingResponseSchema,
  success: messageResponseSchema.shape.success,
});
