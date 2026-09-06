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
        title_header_gallery_videos: "Galería de videos",
        description_header_gallery_videos: "Explora nuestra colección de momentos inolvidables y celebraciones únicas",
        catalog_gallery_videos: JSON.stringify([
          
            {
              id: 1772882923001,
              title: "SHOW EN VIVO - BUS COMERCIAL",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923002,
              title: "SHOW NOCTURNO - EDICIÓN ESPECIAL",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923003,
              title: "PRESENTACIÓN VIP - RUTA URBANA",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: false,
            },
            {
              id: 1772882923004,
              title: "SHOW ACÚSTICO - RUTA EXPRÉS",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923005,
              title: "EVENTO PRIVADO - BUS TURÍSTICO",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923006,
              title: "SHOW DE MEDIODÍA - RUTA NORTE",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: false,
            },
            {
              id: 1772882923007,
              title: "CONCIERTO SOBRE RUEDAS - RUTA SUR",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923008,
              title: "SHOW DE TALENTO - BUS EJECUTIVO",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923009,
              title: "FIESTA TEMÁTICA - RUTA CENTRAL",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923010,
              title: "SHOW DE HUMOR - BUS COMERCIAL",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: false,
            },
            {
              id: 1772882923011,
              title: "RETRO HITS - RUTA NOCTURNA",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923012,
              title: "SHOW DE MAGIA EN VIVO - BUS VIP",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923013,
              title: "DJ SET EN VIVO - RUTA COSTERA",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923014,
              title: "SHOW ROCK & ROLL - BUS EXPRESS",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: false,
            },
            {
              id: 1772882923015,
              title: "FESTIVAL DE VERANO - RUTA PANORÁMICA",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923016,
              title: "SHOW DE IMPROVISACIÓN - BUS URBANO",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923017,
              title: "NOCHE DE JAZZ - RUTA METROPOLITANA",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923018,
              title: "SHOW DE BAILE MODERNO - BUS 4K",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: true,
            },
            {
              id: 1772882923019,
              title: "EXPERIENCIA INMERSIVA - RUTA ESTELAR",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              active: false,
            },
            {
              id: 1772882923020,
              title: "GRAN CIERRE DE GIRA - BUS PRINCIPAL",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
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

    await queryInterface.bulkDelete(
      "general_settings",
      {
        title_header_gallery_videos: "",
        description_header_gallery_videos: "",
        catalog_gallery_videos: JSON.stringify([]),
      },
      {
        id: 1,
      },
    );
  },
};
