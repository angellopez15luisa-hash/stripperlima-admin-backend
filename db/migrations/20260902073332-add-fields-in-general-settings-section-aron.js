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

    await queryInterface.addColumn("general_settings", "title_aron", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "banners",
    });
    await queryInterface.addColumn("general_settings", "subtitle_aron", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "title_aron",
    });
    await queryInterface.addColumn("general_settings", "title_editor_aron", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "subtitle_aron",
    });
    (await queryInterface.addColumn(
      "general_settings",
      "description_editor_aron",
      {
        type: Sequelize.TEXT,
        allowNull: false,
        after: "title_editor_aron",
      },
    ),
      await queryInterface.addColumn(
        "general_settings",
        "list_labels_editor_aron",
        {
          type: DataTypes.JSON,
          allowNull: false,
          after: "description_editor_aron",
        },
      ),
      await queryInterface.addColumn(
        "general_settings",
        "text_html_editor_aron",
        {
          type: DataTypes.TEXT,
          allowNull: false,
          after: "list_labels_editor_aron",
        },
      ));
    await queryInterface.addColumn("general_settings", "galery_images_aron", {
      type: DataTypes.JSON,
      allowNull: false,
      after: "text_html_editor_aron",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("general_settings", "title_aron");
    await queryInterface.removeColumn("general_settings", "subtitle_aron");
    await queryInterface.removeColumn("general_settings", "title_editor_aron");
    await queryInterface.removeColumn(
      "general_settings",
      "description_editor_aron",
    );
    await queryInterface.removeColumn(
      "general_settings",
      "list_labels_editor_aron",
    );
    await queryInterface.removeColumn(
      "general_settings",
      "text_html_editor_aron",
    );
    await queryInterface.removeColumn("general_settings", "galery_images_aron");
  },
};
