import z from "zod";
import {
  userForgotPasswordSchema,
  userResetPasswordSchema,
  userSchema,
  userSignInSchema,
  userUpdatePasswordSchema,
  userVerifyResetTokenSchema,
} from "../schemas";
import { MessageResponse } from "./custom";

type User = z.infer<typeof userSchema>;

export type UserSignInBody = z.infer<typeof userSignInSchema>["body"];

export type UserForgotPasswordBody = z.infer<
  typeof userForgotPasswordSchema
>["body"];

export type UserVerifyResetToken = z.infer<
  typeof userVerifyResetTokenSchema
>["params"];

export type UserResetPasswordBody = z.infer<
  typeof userResetPasswordSchema
>["body"];

export type UserResetPasswordParams = z.infer<
  typeof userResetPasswordSchema
>["params"];

export type UserUpdatePasswordBody = z.infer<typeof userUpdatePasswordSchema>['body'];

export type UserGenerateJWT = {
  id: User["id"];
};

export type UserSignInResponse = Omit<MessageResponse, "message"> & {
  token: string;
};

export type UserGetProfileResponse = Omit<MessageResponse, "message"> & {
  user: Omit<User, "password">;
};
