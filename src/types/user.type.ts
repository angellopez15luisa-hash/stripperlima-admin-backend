import z from "zod";
import {
  userForgotPasswordSchema,
  userSchema,
  userSignInSchema,
} from "../schemas";
import { MessageResponse } from "./custom";

type User = z.infer<typeof userSchema>;

export type UserSignInBody = z.infer<typeof userSignInSchema>["body"];

export type UserForgotPasswordBody = z.infer<
  typeof userForgotPasswordSchema
>["body"];

export type UserGenerateJWT = {
  id: User["id"];
};

export type UserSignInResponse = Omit<MessageResponse, "message"> & {
  token: string;
};

export type UserGetProfileResponse = Omit<MessageResponse, "message"> & {
  user: Omit<User, "password">;
};
