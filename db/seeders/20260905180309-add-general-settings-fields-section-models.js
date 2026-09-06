"use strict";

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

    await queryInterface.bulkUpdate(
      "general_settings",
      {
        title_header_models: "Mantenimiento de Sección Modelos",
        description_header_models:
          "Personaliza el título principal, descripción y gestiona el catálogo de modelos del sitio web.",
        catalog_gallery_models: JSON.stringify([
          {
            id: 1,
            name: "Valentina",
            category: "bailarinas",
            image:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
          {
            id: 2,
            name: "Camila",
            category: "bailarinas",
            image:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
          {
            id: 3,
            name: "Alejandro",
            category: "strippers",
            image:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
          {
            id: 4,
            name: "Matías",
            category: "strippers",
            image:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
            active: false,
          },
          {
            id: 5,
            name: "Sofía",
            category: "bailarinas",
            image:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
          {
            id: 6,
            name: "Lucía",
            category: "bailarinas",
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
            active: false,
          },
          {
            id: 7,
            name: "Diego",
            category: "strippers",
            image:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
          {
            id: 8,
            name: "Carlos",
            category: "strippers",
            image:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
            active: false,
          },
          {
            id: 9,
            name: "Mariana",
            category: "bailarinas",
            image:
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
          {
            id: 10,
            name: "Andrés",
            category: "strippers",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            active: true,
          },
        ]),
      },
      {
        id: 1,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("general_settings", {
      title_header_models: "",
      description_header_models: "",
      catalog_gallery_models: JSON.stringify([]),
    }, {
      id:1
    });
  },
};
