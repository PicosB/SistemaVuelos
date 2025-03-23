const asientoDAO = require('../dataAccess/asientoDAO');
const { AppError } = require('../utils/appError');

class AsientoController {

  // Crear un nuevo asiento
  static async crearAsiento(req, res, next) {
    try {
      const { idVuelo, numAsiento, disponibilidad, tipoAsiento } = req.body;
      if (!idVuelo || !numAsiento || !disponibilidad || !tipoAsiento) {
        return next(new AppError('Faltan datos requeridos: idVuelo, numAsiento, disponibilidad o tipoAsiento', 400));
      }
      const nuevoAsiento = await asientoDAO.crearAsiento(idVuelo, numAsiento, disponibilidad, tipoAsiento);
      res.status(201).json({
        status: 'success',
        data: nuevoAsiento,
      });
    } catch (error) {
      next(new AppError('Error al crear el Asiento', 500));
    }
  }

  // Obtener todos los asientos
  static async obtenerAsientos(req, res, next) {
    try {
      const asientos = await asientoDAO.obtenerAsientos();
      if (!asientos.length) {
        return next(new AppError('No se encontraron asientos', 404));
      }
      res.status(200).json({
        status: 'success',
        data: asientos,
      });
    } catch (error) {
      next(new AppError('Error al obtener los asientos', 500));
    }
  }

  // Obtener un asiento por ID
  static async obtenerAsientoPorId(req, res, next) {
    try {
      const { id } = req.params;
      const asiento = await asientoDAO.obtenerAsientoPorId(id);
      if (!asiento) {
        return next(new AppError('Asiento no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: asiento,
      });
    } catch (error) {
      next(new AppError('Error al obtener el asiento por ID', 500));
    }
  }

  // Actualizar un asiento
  static async actualizarAsiento(req, res, next) {
    try {
      const { id } = req.params;
      const { idVuelo, numAsiento, disponibilidad, tipoAsiento } = req.body;
      const asientoActualizado = await asientoDAO.actualizarAsiento(id, idVuelo, numAsiento, disponibilidad, tipoAsiento);
      if (!asientoActualizado) {
        return next(new AppError('Asiento no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: asientoActualizado,
      });
    } catch (error) {
      next(new AppError('Error al actualizar el asiento', 500));
    }
  }

  // Eliminar un asiento
  static async eliminarAsiento(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await asientoDAO.eliminarAsiento(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar el asiento', 500));
    }
  }
}

module.exports = AsientoController;
