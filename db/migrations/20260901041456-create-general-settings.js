"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("general_settings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      social_links: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: "Arreglo JSON con los enlaces de redes sociales",
      },
      title_start: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Titulo principal del Banner/Slide",
      },
      description_start: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      social_links: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: "Arreglo JSON con los enlaces de redes sociales",
      },
      banners: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("current_timestamp"),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal(
          "current_timestamp on update current_timestamp",
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("general_settings");
  },
};
