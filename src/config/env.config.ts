import "dotenv/config";

export const ENV = {
  SERVER: {
    PORT: process.env.PORT,
  },
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: "1h",
  },
  RESEND: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
};
