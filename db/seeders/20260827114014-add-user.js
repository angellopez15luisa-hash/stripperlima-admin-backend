"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const saltRounds = 10;
    const superAdminPassword = await bcrypt.hash("superadmin123", saltRounds);
    const adminPassword = await bcrypt.hash("admin123", saltRounds);

    await queryInterface.bulkInsert("users", [
      {
        name: "Super Administrador",
        email: "superadmin@correo.com",
        password: superAdminPassword,
        role: "super-admin",
        reset_password_token: null,
        reset_password_expires: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Administrador",
        email: "admin@correo.com",
        password: adminPassword,
        role: "admin",
        reset_password_token: null,
        reset_password_expires: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", {
      email: ["superadmin@correo.com", "admin@correo.com"],
    });
  },
};
