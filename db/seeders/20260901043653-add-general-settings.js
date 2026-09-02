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

    await queryInterface.bulkInsert(
      "general_settings",
      [
        {
          title_start: "Despedidas de Solteros Inolvidables",
          description_start:
            "Crea momentos únicos con nuestros servicios exclusivos para despedidas de soltero que nunca olvidarás.",
          social_links: JSON.stringify([
            { key: "instagram", url: "https://instagram.com/aroneventosperu" },
            { key: "facebook", url: "https://facebook.com/aroneventosperu" },
            { key: "tiktok", url: "https://tiktok.com/@el.indomable35" },
            { key: "twitter", url: "https://twitter.com/..." },
            { key: "whatsapp", url: "https://wa.me/..." },
          ]),
          banners: JSON.stringify([
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200",
              active: true,
            },
            {
              id: 2,
              image:
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200",
              active: false,
            },
          ]),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("general_settings", { id: 1 }, {});
  },
};
