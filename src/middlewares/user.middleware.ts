import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types";
import jwt from "jsonwebtoken";
import { User } from "../models";

export class UserMiddleware {
  static verifyToken = async (
    req: Request,
    res: Response<void>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bearer = req.get("authorization") || req.headers.authorization;
      if (!bearer || !bearer.startsWith("Bearer "))
        throw new CustomError("No autorizado", 404);
      const token = bearer.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;
      const user = await User.findByPk(decoded.id, {
        attributes: {
          exclude: ["password", "resetPasswordToken", "resetPasswordExpires"],
        },
      });
      if (!user)
        throw new CustomError(
          "El usuario asociado a este token ya no existe",
          404,
        );
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof CustomError) {
        return next(error);
      }

      if (error instanceof jwt.TokenExpiredError) {
        const errorMessage = new CustomError(
          "El token ha expirado, por favor inicia sesion nuevamnete",
          401,
        );
        return next(errorMessage);
      }
      if (error instanceof jwt.JsonWebTokenError) {
        const errorMessage = new CustomError("Token no valido", 401);
        return next(errorMessage);
      }

      next(error);
    }
  };
}
