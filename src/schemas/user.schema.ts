import z from "zod";
export const userSchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "El name es requerido",
    invalid_type_error: "El name debe ser una cadena de texto",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser una cadena de texto",
    })
    .email({ message: "El email debe tener un formato valido" }),
  password: z
    .string({
      required_error: "El password es requerido",
      invalid_type_error: "El password debe ser una cadena de texto",
    })
    .min(8, { message: "El password debe tener al menos 8 caracteres" })
    .max(15, { message: "El password debe tener maximo 20 caracteres" }),
  role: z.string(),
  resetPasswordToken: z.string(),
  resetPasswordExpires: z.date(),
});

export const userSignInSchema = z.object({
  body: userSchema.pick({
    email: true,
    password: true,
  }),
});
