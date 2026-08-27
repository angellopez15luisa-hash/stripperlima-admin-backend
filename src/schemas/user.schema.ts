import z from "zod";
export const userSchema = z.object({
  id: z.number(),
  name: z
    .string({
      invalid_type_error: "El name debe ser una cadena de texto",
    })
    .min(1, { message: "El name es requerido" }),
  email: z
    .string({
      invalid_type_error: "El email debe ser una cadena de texto",
    })
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email debe tener un formato valido" }),
  password: z
    .string({
      invalid_type_error: "El password debe ser una cadena de texto",
    })
    .min(1, { message: "El password es requerido" })
    .min(8, { message: "El password debe tener al menos 8 caracteres" })
    .max(15, { message: "El password debe tener maximo 20 caracteres" }),
  role: z.string(),
  resetPasswordToken: z.string(),
  resetPasswordExpires: z.date(),
  frontendUrl: z
    .string({ message: "El frontendUrl debe ser una cadena de texto" })
    .min(1, "El frontendUrl es obligatorio"),
});

export const userSignInSchema = z.object({
  body: userSchema.pick({
    email: true,
    password: true,
  }),
});

export const userForgotPasswordSchema = z.object({
  body: userSchema.pick({
    email: true,
    frontendUrl: true,
  }),
});
