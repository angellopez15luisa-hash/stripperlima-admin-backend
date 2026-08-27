import { checkPassword, generateJWT } from "../helpers";
import { User } from "../models";
import { UserGenerateJWT, UserSignInBody } from "../types";
import { CustomError } from "../types/custom";

export class UserService {
  static signIn = async (data: UserSignInBody): Promise<string> => {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError("Email no existe", 404);
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) throw new CustomError("Password incorrecto", 404);
    const token = generateJWT({ id: user.id });
    return token;
  };
}
