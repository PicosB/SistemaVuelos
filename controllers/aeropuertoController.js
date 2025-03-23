const aeropuertoDAO = require('../dataAccess/aeropuertoDAO');
const { AppError } = require('../utils/appError');

class AeropuertoController {

  // Crear un nuevo aeropuerto
  static async crearAeropuerto(req, res, next) {
    try {
      const { nombre, codigo, ciudad, pais } = req.body;
      if (!nombre || !codigo || !ciudad || !pais) {
        return next(new AppError('Faltan datos requeridos: nombre, codigo, ciudad o pais', 400));
      }
      const nuevoAeropuerto = await aeropuertoDAO.crearAeropuerto(nombre, codigo, ciudad, pais);
      res.status(201).json({
        status: 'success',
        data: nuevoAeropuerto,
      });
    } catch (error) {
      next(new AppError('Error al crear el Aeropuerto', 500));
    }
  }

  // Obtener todos los aeropuertos
  static async obtenerAeropuertos(req, res, next) {
    try {
      const aeropuertos = await aeropuertoDAO.obtenerAeropuertos();
      if (!aeropuertos.length) {
        return next(new AppError('No se encontraron aeropuertos', 404));
      }
      res.status(200).json({
        status: 'success',
        data: aeropuertos,
      });
    } catch (error) {
      next(new AppError('Error al obtener los aeropuertos', 500));
    }
  }

  // Obtener un aeropuerto por ID
  static async obtenerAeropuertoPorId(req, res, next) {
    try {
      const { id } = req.params;
      const aeropuerto = await aeropuertoDAO.obtenerAeropuertoPorId(id);
      if (!aeropuerto) {
        return next(new AppError('Aeropuerto no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: aeropuerto,
      });
    } catch (error) {
      next(new AppError('Error al obtener el aeropuerto por ID', 500));
    }
  }

  // Actualizar un aeropuerto
  static async actualizarAeropuerto(req, res, next) {
    try {
      const { id } = req.params;
      const { nombre, codigo, ciudad, pais } = req.body;
      const aeropuertoActualizado = await aeropuertoDAO.actualizarAeropuerto(id, nombre, codigo, ciudad, pais);
      if (!aeropuertoActualizado) {
        return next(new AppError('Aeropuerto no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: aeropuertoActualizado,
      });
    } catch (error) {
      next(new AppError('Error al actualizar el aeropuerto', 500));
    }
  }

  // Eliminar un aeropuerto
  static async eliminarAeropuerto(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await aeropuertoDAO.eliminarAeropuerto(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar el aeropuerto', 500));
    }
  }
}

module.exports = AeropuertoController;
