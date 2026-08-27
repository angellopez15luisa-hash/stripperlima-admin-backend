// Requerimos dotenv para cargar las variables del archivo .env
require('dotenv').config();

const configCommon = {
  timezone: "-05:00", // Zona horaria de Lima (UTC -5)
   define: {
    underscored: true // <--- ¡AGREGA ESTO AQUÍ!
  },
  dialectOptions: {
    dateStrings: true, // Fuerza a Sequelize a devolver fechas como strings en vez de objetos Date en UTC
    typeCast: true,    // Ayuda a mantener el formato string al leer de la base de datos
    timezone: "-05:00" // Sincroniza la sesión de la base de datos con la hora de Lima
  }
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    ...configCommon
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    ...configCommon
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    ...configCommon
  }
};