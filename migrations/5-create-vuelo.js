'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vuelos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origen: {
        type: Sequelize.STRING
      },
      destino: {
        type: Sequelize.STRING
      },
      fechaSalida: {
        type: Sequelize.DATE
      },
      fechaLlegada: {
        type: Sequelize.DATE
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      idAeropuerto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Aeropuertos',
          key:'id'
        }
      },
      idAerolinea: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Aerolineas',
          key:'id'
        }
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
    await queryInterface.dropTable('Vuelos');
  }
};