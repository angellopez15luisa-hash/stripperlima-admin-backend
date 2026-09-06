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

    await queryInterface.bulkUpdate("general_settings",
      {
      title_header_gallery_events: "Mantenimiento Sección: Galería de Eventos",
      description_header_gallery_events:
        "Personaliza el título principal, descripción y gestiona el catálogo de imágenes de eventos del sitio web.",
      catalog_gallery_events: JSON.stringify([
        {
          id: 1717000001,
          name: "Concierto de Rock Acústico",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000002,
          name: "Festival de Jazz al Aire Libre",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000003,
          name: "Exposición de Arte Moderno",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-15312435441d4-8d92f703f8f7?w=800&auto=format&fit=crop&q=60",
          active: false,
        },
        {
          id: 1717000004,
          name: "Torneo Relámpago de eSports",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000005,
          name: "Feria Gastronómica Internacional",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000006,
          name: "Maratón Nocturna 10K",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=60",
          active: false,
        },
        {
          id: 1717000007,
          name: "Conferencia de Inteligencia Artificial",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000008,
          name: "Taller de Coctelería Artesanal",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000009,
          name: "Stand-Up Comedy Night",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1585699324551-f6c309eed85b?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000010,
          name: "Competencia de Breakdance",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&auto=format&fit=crop&q=60",
          active: false,
        },
        {
          id: 1717000011,
          name: "Seminario de Marketing Digital",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000012,
          name: "Exhibición de Autos Clásicos",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000013,
          name: "Noche de Cine Bajo las Estrellas",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000014,
          name: "Masterclass de Repostería Fina",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60",
          active: false,
        },
        {
          id: 1717000015,
          name: "Convención de Cómic y Anime",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000016,
          name: "Retiro de Yoga y Meditación",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000017,
          name: "Fiesta de Música Electrónica",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000018,
          name: "Feria de Emprendedores Locales",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000019,
          name: "Cata de Vinos y Quesos",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60",
          active: false,
        },
        {
          id: 1717000020,
          name: "Torneo de Pádel Amateur",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000021,
          name: "Encuentro de Poesía Urbana",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000022,
          name: "Exhibición de Dones y Fotografía",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000023,
          name: "Pasarela de Moda Sustentable",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000024,
          name: "Hackatón de Desarrollo Web",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000025,
          name: "Taller de Cerámica y Alfarería",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=60",
          active: false,
        },
        {
          id: 1717000026,
          name: "Concierto Sinfónico Escolar",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000027,
          name: "Competencia de Skateboarding",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000028,
          name: "Feria de Adopción de Mascotas",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000029,
          name: "Show de Magia e Ilusionismo",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
        {
          id: 1717000030,
          name: "Festival de Danza Contemporánea",
          category: "Despedida VIP",
          image:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=60",
          active: true,
        },
      ]),
      }, {
      id:1
    });
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
        title_header_gallery_events: "",
        description_header_gallery_events: "",
        catalog_gallery_events: JSON.stringify([]),
      },
      {
        id: 1,
      },
    );
  },
};
