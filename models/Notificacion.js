'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notificacion.belongsTo(models.Usuario, {foreignKey: 'idUsuario'});
    }
  }
  Notificacion.init({
    idUsuario: DataTypes.INTEGER,
    mensaje: DataTypes.STRING,
    fechaEnvio: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notificacion',
  });
  return Notificacion;
};