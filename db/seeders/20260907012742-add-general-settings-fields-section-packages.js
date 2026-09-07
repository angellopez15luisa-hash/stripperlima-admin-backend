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
        title_header_packages: "Nuestros Paquetes",
        description_header_packages:
          "Ofrecemos una amplia gama de servicios personalizados para hacer de tu despedida de soltero un evento inolvidable.",
        catalog_gallery_packages: JSON.stringify([
          {
            id: 1725675000001,
            icon: "ri-vip-crown-line",
            title: "Shows Privados",
            description:
              "Espectáculos exclusivos con nuestras modelos profesionales adaptados a tus preferencias y en la ubicación que elijas.",
            features: [
              "Duración de 1-2 horas",
              "Personalización completa",
              "Vestuario a elección",
            ],
            active: true,
          },
          {
            id: 1725675000002,
            icon: "ri-cake-3-line",
            title: "Fiestas Temáticas",
            description:
              "Celebraciones con temáticas exclusivas: Casino, Hollywood, Años 80, Piratas y muchas más opciones a elegir.",
            features: [
              "Decoración temática completa",
              "Modelos caracterizadas",
              "Actividades relacionadas",
            ],
            active: true,
          },
          {
            id: 1725675000003,
            icon: "ri-ship-line",
            title: "Yacht Parties",
            description:
              "Celebra tu despedida a bordo de un yate de lujo con modelos, bebidas premium y catering exclusivo.",
            features: [
              "Yate privado (4-6 horas)",
              "Barra libre premium",
              "Modelos y animación",
            ],
            active: true,
          },
          {
            id: 1725675000004,
            icon: "ri-building-line",
            title: "Paquetes Todo Incluido",
            description:
              "Organización completa de tu despedida con alojamiento, transporte, actividades y shows.",
            features: [
              "Alojamiento premium",
              "Traslados privados",
              "Actividades diurnas y nocturnas",
            ],
            active: true,
          },
          {
            id: 1725675000005,
            icon: "ri-goblet-line",
            title: "Camareras Temáticas",
            description:
              "Servicio exclusivo de camareras profesionales con vestuario temático para tu evento privado.",
            features: [
              "Servicio de 3-4 horas",
              "Preparación de cócteles",
              "Vestuario a elección",
            ],
            active: true,
          },
          {
            id: 1725675000006,
            icon: "ri-vip-diamond-line",
            title: "Servicios VIP",
            description:
              "Experiencias exclusivas diseñadas a medida para los clientes más exigentes con atención personalizada.",
            features: [
              "Diseño 100% personalizado",
              "Asistente personal 24h",
              "Experiencias exclusivas",
            ],
            active: true,
          },
          {
            id: 1725675000007,
            icon: "ri-car-line",
            title: "Transporte Ejecutivo",
            description:
              "Traslados seguros y discretos en vehículos de alta gama para ti y tus invitados durante toda la noche.",
            features: [
              "Chofer privado bilingüe",
              "Unidades SUV / Limusinas",
              "Puntualidad y discreción",
            ],
            active: true,
          },
          {
            id: 1725675000008,
            icon: "ri-camera-line",
            title: "Fotografía y Video",
            description:
              "Captura los mejores momentos de tu celebración con cobertura profesional en foto y video de alta calidad.",
            features: [
              "Sesión fotográfica completa",
              "Video resumen para redes",
              "Entrega digital en 48h",
            ],
            active: true,
          },
          {
            id: 1725675000009,
            icon: "ri-disc-line",
            title: "DJ y Sonido Pro",
            description:
              "Ameniza tu fiesta con el mejor ambiente musical, equipos de sonido profesionales e iluminación de discoteca.",
            features: [
              "DJ en vivo especializado",
              "Equipo de sonido e iluminación",
              "Lista de música personalizada",
            ],
            active: true,
          },
          {
            id: 1725675000010,
            icon: "ri-shield-star-line",
            title: "Seguridad Discreta",
            description:
              "Personal de seguridad altamente capacitado para garantizar absoluta privacidad y tranquilidad en tu evento.",
            features: [
              "Custodia personal y de locación",
              "Protocolo de máxima discreción",
              "Personal con experiencia VIP",
            ],
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
        title_header_packages: "",
        description_header_packages: "",
        catalog_gallery_packages: JSON.stringify([]),
      },
      {
        id: 1,
      },
    );
  },
};
