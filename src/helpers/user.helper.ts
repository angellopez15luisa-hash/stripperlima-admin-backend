import { User } from "../models";
import bcrypt from "bcrypt";

export const checkPassword = async (
  inputPassword: User["password"],
  dbPassword: User["password"],
) => await bcrypt.compare(inputPassword, dbPassword);

export const hash = async (password: User["password"]) =>
  await bcrypt.hash(password, 10);
