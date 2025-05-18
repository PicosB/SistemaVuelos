const vueloDAO = require('../dataAccess/vueloDAO');
const { AppError } = require('../utils/appError');

class VueloController {

  // Crear un nuevo vuelo
  static async crearVuelo(req, res, next) {
    try {
      const { origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea } = req.body;
      if (!origen || !destino || !fechaSalida || !fechaLlegada || !precio || !idAeropuerto || !idAerolinea) {
        return next(new AppError('Faltan datos requeridos: origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto o idAerolinea', 400));
      }
      const nuevoVuelo = await vueloDAO.crearVuelo(origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea);
      res.status(201).json({
        status: 'success',
        data: nuevoVuelo,
      });
    } catch (error) {
      next(new AppError('Error al crear el vuelo', 500));
    }
  }

  // Obtener todos los vuelos
  static async obtenerVuelos(req, res, next) {
    try {
      const vuelos = await vueloDAO.obtenerVuelos();
      if (!vuelos.length) {
        return next(new AppError('No se encontraron vuelos', 404));
      }
      res.status(200).json({
        status: 'success',
        data: vuelos,
      });
    } catch (error) {
      next(new AppError('Error al obtener los vuelos', 500));
    }
  }

  // Obtener un vuelo por ID
  static async obtenerVueloPorId(req, res, next) {
    try {
      const { id } = req.params;
      const vuelo = await vueloDAO.obtenerVueloPorId(id);
      if (!vuelo) {
        return next(new AppError('Vuelo no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: vuelo,
      });
    } catch (error) {
      next(new AppError('Error al obtener el vuelo por ID', 500));
    }
  }

  // Actualizar un vuelo
  static async actualizarVuelo(req, res, next) {
    try {
      const { id } = req.params;
      const { origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea } = req.body;
      const vueloActualizado = await vueloDAO.actualizarVuelo(id, origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea);
      if (!vueloActualizado) {
        return next(new AppError('Vuelo no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: vueloActualizado,
      });
    } catch (error) {
      next(new AppError('Error al actualizar el vuelo', 500));
    }
  }

  // Eliminar un vuelo
  static async eliminarVuelo(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await vueloDAO.eliminarVuelo(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar el vuelo', 500));
    }
  }

  static async obtenerVuelosPorCriterios(req, res) {
    try {
      const { origen, destino, salida: fechaSalida } = req.query;

      if (!origen || !destino || !fechaSalida) {
        return next(new AppError('Debes proporcionar origen, destino y fecha de salida', 400));
      }

      const vuelos = await vueloDAO.obtenerVuelosPorCriterios(origen, destino, fechaSalida);

      if (!vuelos.length) {
        return next(new AppError('No se encontraron vuelos', 404));
      }

      res.status(200).json({
        status: 'success',
        data: vuelos,
      });
    } catch (error) {
      next(new AppError('Error al obtener los vuelos', 500));
    }
  }

}

module.exports = VueloController;
