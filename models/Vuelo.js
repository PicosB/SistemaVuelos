'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vuelo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vuelo.belongsTo(models.Aeropuerto, { as: 'AeropuertoSalida', foreignKey: 'idaeropuertoSalida' });
      Vuelo.belongsTo(models.Aeropuerto, { as: 'AeropuertoLlegada', foreignKey: 'idaeropuertoLlegada' });
      Vuelo.belongsTo(models.Aerolinea, { foreignKey: 'idaerolinea' });
      Vuelo.hasMany(models.Asiento, { foreignKey: 'idvuelo' });
      Vuelo.hasMany(models.Reserva, { foreignKey: 'idvuelo' });
    }
  }
  Vuelo.init({
    origen: DataTypes.STRING,
    destino: DataTypes.STRING,
    fechaSalida: DataTypes.DATE,
    fechaLlegada: DataTypes.DATE,
    precio: DataTypes.DECIMAL,
    idAeropuerto: DataTypes.INTEGER,
    idAerolinea: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vuelo',
  });
  return Vuelo;
};