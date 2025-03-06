'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boletos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Reservas',
          key:'id'
        }
      },
      idAsiento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Asientos',
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
    await queryInterface.dropTable('Boletos');
  }
};