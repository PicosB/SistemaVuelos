'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aeropuerto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Aeropuerto.hasMany(models.Vuelo, { as: 'VuelosSalida', foreignKey: 'idAeropuertoSalida' });
      Aeropuerto.hasMany(models.Vuelo, { as: 'VuelosLlegada', foreignKey: 'idAeropuertoLlegada' });
    }
  }
  Aeropuerto.init({
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aeropuerto',
  });
  return Aeropuerto;
};