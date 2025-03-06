'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reserva.belongsTo(models.Usuario, {foreignKey: 'idusuario'});
      Reserva.hasOne(models.Pago, {foreignKey: 'idreserva'});
      Reserva.belongsTo(models.Vuelo, {foreignKey: 'idvuelo'});
      Reserva.hasMany(models.Boleto, {foreignKey: 'idreserva'});
    }
  }
  Reserva.init({
    idUsuario: DataTypes.INTEGER,
    idVuelo: DataTypes.INTEGER,
    fechaReservacion: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};