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
        title_aron: "Araon el Indomable",
        subtitle_aron: "La elegancia del deseo. El arte de la seducción.",
        title_editor_aron:'El Mejor Experiencia en Despedidas de Soltero',
        description_editor_aron:
          "La elegancia del deseo. El arte de la seducción. Para quienes buscan una experiencia inolvidable en su despedida de soltero, Araon el Indomable ofrece un espectáculo exclusivo, designed para cautivar, entretener y elevar la celebración a un nivel superior.",
        list_labels_editor_aron: JSON.stringify([
          { id: 1, text: "Estilo, presencia y sofisticación" },
          { id: 2, text: "Coreografía profesional y carisma natural" },
          { id: 3, text: "Ambiente cuidado, discreto y de alta categoría" },
          { id: 4, text: "Donde la seducción se viste de gala" },
          { id: 5, text: "“No es un show, es una experiencia”" },
          { id: 6, text: "Elegancia, deseo... y un poco de locura." },
          { id: 7, text: "Cuando lo exclusivo se vuelve tentación." },
        ]),
        text_html_editor_aron:
          "<p>No es solo un show... Es una experiencia pensada para quienes valoran el detalle, la estética y el buen gusto. Una noche para recordar... y jamás contaría igual.</p><p>Disponible para eventos privados, despedidas de soltero, celebraciones íntimas y noches especiales.</p><p>Consultas y reservas: <strong>947 272 595</strong></p><p>Araon el Indomable Porque el placer también puede tener clase.</p>",
        galery_images_aron: JSON.stringify([
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
          },
          {
            id: 2,
            url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600",
          },
          {
            id: 3,
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
          },
          {
            id: 4,
            url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
          },
          {
            id: 5,
            url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600",
          },
          {
            id: 6,
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
          },
        ]),
      },
      {
        id: 1, // Actualiza el registro principal de configuración
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
    await queryInterface.bulkUpdate(
      "general_settings",
      {
        title_aron: "",
        subtitle_aron: "",
        title_editor_aron:'',
        description_editor_aron: "",
        list_labels_editor_aron: JSON.stringify([]),
        text_html_editor_aron: "",
        galery_images_aron: JSON.stringify([]),
      },
      {
        id: 1,
      },
    );
  },
};
