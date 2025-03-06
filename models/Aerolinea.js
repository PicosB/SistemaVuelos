'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aerolinea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Aerolinea.hasMany(models.Vuelo, { foreignKey: 'idaerolinea' });
    }
  }
  Aerolinea.init({
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aerolinea',
  });
  return Aerolinea;
};