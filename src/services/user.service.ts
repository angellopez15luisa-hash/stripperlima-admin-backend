import { checkPassword, generateJWT, sendPasswordResetEmail } from "../helpers";
import { User } from "../models";
import { UserForgotPasswordBody, UserSignInBody } from "../types";
import { CustomError } from "../types/custom";
import crypto from "crypto";

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

  static forgotPassword = async (
    data: UserForgotPasswordBody,
  ): Promise<string> => {
    const { email, frontendUrl } = data;
    const user = await User.findOne({ where: { email } });
    if (!user)
      throw new CustomError(
        "No existe una cuenta registrada con este correo",
        404,
      );
    //   1.- Generamos el token y la expiracion
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora

    //   2.- Guardamos en la base de datos
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // 3. Construimos el enlace hacia el frontend
    // Nota: Asegúrate de que esta URL sea la correcta de tu frontend
    // const frontendUrl = process.env.FRONTEND_URL_ADMIN;
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${resetToken}`;

    // 4. Enviamos el correo usando el helper
    await sendPasswordResetEmail(user.email, resetUrl);

    return "Se ha enviado un enlace de recuperacion a tu correo.";
  };
}
