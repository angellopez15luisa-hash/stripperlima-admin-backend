import { Sequelize } from "sequelize";
import "dotenv/config";

const dbConfig = require("../../db/config");

// Detectamos el entorno actual (por defecto 'development')
const env = process.env.NODE_ENV || "development";

// Extraemos la configuración correspondiente al entorno actual
const config = (dbConfig as any)[env];

if (!config) {
  throw new Error(`No se encontró la configuración para el entorno: ${env}`);
}

// Inicializamos Sequelize utilizando las variables y las opciones de zona horaria de tu config.js
const sequelize = new Sequelize(
  config.database || (process.env.DB_NAME as string),
  config.username || (process.env.DB_USER as string),
  config.password || (process.env.DB_PASSWORD as string),
  {
    host: config.host || process.env.DB_HOST,
    dialect: config.dialect || (process.env.DB_DIALECT as any) || "mysql",
    logging: config.logging !== undefined ? config.logging : false,
    timezone: config.timezone,
    dialectOptions: config.dialectOptions,
    define: {
      underscored: true,
    },
  },
);

export { sequelize };

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("¡Conexión a la base de datos establecida exitosamente!");

    // await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};
