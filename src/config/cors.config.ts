import { CorsOptions } from "cors";
import "dotenv/config";

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const whitelist: Array<string | undefined> = [
      process.env.FRONTEND_URL_5176,
      process.env.FRONTEND_URL_5175,
      process.env.FRONTEND_URL_5174,
      process.env.FRONTEND_URL,
      undefined, // Útil para Postman o peticiones server-to-server
    ];
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};


