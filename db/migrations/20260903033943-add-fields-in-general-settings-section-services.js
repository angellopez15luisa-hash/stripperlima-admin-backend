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

    await queryInterface.addColumn(
      "general_settings",
      "title_header_services",
      {
        type: DataTypes.STRING,
        allowNull: false,
        after:'galery_images_aron'
      },
    );
    await queryInterface.addColumn(
      "general_settings",
      "description_header_services",
      {
        type: DataTypes.TEXT,
        allowNull: false,
        after:'title_header_services'
      },
    );
    await queryInterface.addColumn(
      "general_settings",
      "catalog_gallery_services",
      {
        type: DataTypes.JSON,
        allowNull: false,
        after:'description_header_services'
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn(
      "general_settings",
      "title_header_services",
    );
    await queryInterface.removeColumn(
      "general_settings",
      "description_header_services",
    );
    await queryInterface.removeColumn(
      "general_settings",
      "catalog_gallery_services",
    );
  },
};
