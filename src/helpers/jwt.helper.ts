import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserGenerateJWT } from "../types";

export const generateJWT = (data: UserGenerateJWT) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};
