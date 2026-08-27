import { Resend } from "resend";
import { ENV } from "../config";
import { User } from "../models";

const resend = new Resend(ENV.RESEND.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
  email: User['email'],
  resetUrl: string,
) => {
  try {
    const { data, error } = await resend.emails.send({
      // Usamos 'onboarding@resend.dev' para pruebas sin dominio propio
      from: "Administración App <soporte@imaynadigital.com>",
      to: [email],
      subject: "Restablecer tu contraseña",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>¿Olvidaste tu contraseña?</h2>
          <p>Haz clic en el siguiente enlace para restablecerla. Este enlace expira en 1 hora:</p>
          <a href="${resetUrl}" style="background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Restablecer contraseña</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Si no solicitaste esto, ignora este correo.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error reportado por Resend:", error);
      throw new Error("No se pudo enviar el correo de recuperación");
    }

    console.log("Correo enviado con éxito por Resend:", data);
    return data;
  } catch (error) {
    console.error("Error en sendPasswordResetEmail:", error);
    throw error;
  }
};