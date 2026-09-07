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
        title_header_contact: 'Contáctanos y Haz Realidad tu Evento',
        description_header_contact: 'Ponte en comunicación con nosotros para reservas, cotizaciones y resolver todas tus dudas.',
        information_contact: JSON.stringify(
          {
            address: 'Pasaje buena Ventura 155 breña Lima - Perú',
            phone: '+51 929 720 720',
            email: 'info@stripperlima101.pe',
            businessHours:'Lunes a Viernes: 10:00 - 20:00\nSábados: 11:00 - 15:00'
          }
        )
      },
      {
        id:1
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('general_settings',
      {
        title_header_contact: '',
        description_header_contact: '',
        information_contact:JSON.stringify({})
      },
      {
        id:1
      }
    )
  },
};
