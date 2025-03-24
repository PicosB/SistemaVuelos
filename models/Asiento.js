'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asiento.belongsTo(models.Vuelo, {foreignKey: 'idVuelo'});
      Asiento.hasOne(models.Boleto, {foreignKey: 'idAsiento'});
    }
  }
  Asiento.init({
    idVuelo: DataTypes.INTEGER,
    numAsiento: DataTypes.INTEGER,
    disponibilidad: DataTypes.BOOLEAN,
    tipoAsiento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Asiento',
  });
  return Asiento;
};