'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Asientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idVuelo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Vuelos',
          key:'id'
        }
      },
      numAsiento: {
        type: Sequelize.INTEGER
      },
      disponibilidad: {
        type: Sequelize.BOOLEAN
      },
      tipoAsiento: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Asientos');
  }
};