'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const UsuarioDAO = require('./dataAccess/usuarioDAO')
const NotificacionDAO = require('./dataAccess/notificacionDAO');
const ReservaDAO = require('./dataAccess/reservaDAO');
const VueloDAO = require('./dataAccess/vueloDAO');
const BoletoDAO = require('./dataAccess/boletoDAO');
const AsientoDAO = require('./dataAccess/asientoDAO');
const AeropuertoDAO = require('./dataAccess/aeropuertoDAO');
const AerolineaDAO = require('./dataAccess/aerolineaDAO');
const PagoDAO = require('./dataAccess/pagoDAO');

async function realizarTransacciones() {
  try {
    //Sincronizar los modelos con la base de datos
    await sequelize.sync();

    //Crear un Usuario
    //const nuevoUsuario = await UsuarioDAO.crearUsuario('Raul', 'Luna', 'Bringas', 'raulBringas@gmail.com', 'contraseña123', '644213456', 'usuario');
    const nuevoUsuario = await UsuarioDAO.crearUsuario('Brayan', 'Garcia', 'Picos', 'brayangp@gmail.com', '123123', '6542321521','administrador');
    console.log('Usuario creado:', nuevoUsuario.toJSON());

    //Obtener Usuarios
    const usuarios = await UsuarioDAO.obtenerUsuarios();
    console.log('Usuarios:', usuarios);



  } catch (error) {
    console.log('Error en las transacciones:',error);
  } finally {
    //Cierra la conexion a la base de datos cuando todas las transacciones han terminado
    await sequelize.close();
  }
  




}

//Ejecutar las transacciones
realizarTransacciones();