'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boleto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Boleto.belongsTo(models.Reserva, { foreignKey: 'idReserva' });
      Boleto.belongsTo(models.Asiento, { foreignKey: 'idAsiento' });
    }
  }
  Boleto.init({
    idReserva: DataTypes.INTEGER,
    idAsiento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Boleto',
  });
  return Boleto;
};