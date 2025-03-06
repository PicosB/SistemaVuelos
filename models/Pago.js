'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pago.belongsTo(models.Reserva, {foreignKey: 'idreserva'});
    }
  }
  Pago.init({
    idReserva: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    fechaPago: DataTypes.DATE,
    metodoPago: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pago',
  });
  return Pago;
};