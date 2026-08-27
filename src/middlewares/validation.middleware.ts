import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validateSchema =
  (schema: ZodType) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      // Guardamos el resultado transformado por Zod
      const parsedData = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as any;
      // Asignamos los datos validados de forma segura
      if (parsedData.body) {
        req.body = parsedData.body;
      }

      if (parsedData.query) {
        req.query = { ...req.query, ...parsedData.query };
      }

      if (parsedData.params) {
        req.params = { ...req.params, ...parsedData.params };
      }
      return next();
    } catch (error) {
      console.log("❌ ERROR DE ZOD EN MIDDLEWARE:", error);

      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Error de validación en los datos de entrada",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

