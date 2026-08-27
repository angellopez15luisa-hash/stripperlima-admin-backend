import z from "zod";
import { userSignInSchema } from "../schemas";
import { User } from "../models";
import { MessageResponse } from "./custom";

export type UserSignInBody = z.infer<typeof userSignInSchema>["body"];

export type UserGenerateJWT = {
  id: User["id"];
};

export type UserSignInResponse = Omit<MessageResponse, "message"> & {
  token: string;
};
