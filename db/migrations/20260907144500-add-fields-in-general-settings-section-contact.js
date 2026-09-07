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

    await queryInterface.addColumn("general_settings", "title_header_contact", {
      type: DataTypes.STRING,
      allowNull: false,
      after: "catalog_gallery_packages",
    });
    await queryInterface.addColumn(
      "general_settings",
      "description_header_contact",
      {
        type: DataTypes.STRING,
        allowNull: false,
        after: "title_header_contact",
      },
    );
    await queryInterface.addColumn('general_settings', 'information_contact',
      {
        type: DataTypes.JSON,
        allowNull: false,
        after:'description_header_contact'
      }
    )
     
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('general_settings', 'title_header_contact')
    await queryInterface.removeColumn('general_settings', 'description_header_contact')
    await queryInterface.removeColumn('general_settings','information_contact')
  },
};
