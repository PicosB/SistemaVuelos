const notificacionDAO = require('../dataAccess/notificacionDAO');
const { AppError } = require('../utils/appError');

class NotificacionController {

  // Crear una nueva notificacion
  static async crearNotificacion(req, res, next) {
    try {
      const { idUsuario, mensaje, fechaEnvio, estado } = req.body;
      if (!idUsuario || !mensaje || !fechaEnvio || !estado) {
        return next(new AppError('Faltan datos requeridos: idUsuario, mensaje, fechaEnvio o estado', 400));
      }
      const nuevaNotificacion = await notificacionDAO.crearNotificacion(idUsuario, mensaje, fechaEnvio, estado);
      res.status(201).json({
        status: 'success',
        data: nuevaNotificacion,
      });
    } catch (error) {
      next(new AppError('Error al crear la Notificacion', 500));
    }
  }

  // Obtener todas las notificaciones
  static async obtenerNotificaciones(req, res, next) {
    try {
      const notificaciones = await notificacionDAO.obtenerNotificaciones();
      if (!notificaciones.length) {
        return next(new AppError('No se encontraron notificaciones', 404));
      }
      res.status(200).json({
        status: 'success',
        data: notificaciones,
      });
    } catch (error) {
      next(new AppError('Error al obtener las notificaciones', 500));
    }
  }

  // Obtener una notificacion por ID
  static async obtenerNotificacionPorId(req, res, next) {
    try {
      const { id } = req.params;
      const notificacion = await notificacionDAO.obtenerNotificacionPorId(id);
      if (!notificacion) {
        return next(new AppError('Notificacion no encontrada', 404));
      }
      res.status(200).json({
        status: 'success',
        data: notificacion,
      });
    } catch (error) {
      next(new AppError('Error al obtener la notificacion por ID', 500));
    }
  }

  // Actualizar una notificacion
  static async actualizarNotificacion(req, res, next) {
    try {
      const { id } = req.params;
      const { idUsuario, mensaje, fechaEnvio, estado } = req.body;
      const notificacionActualizada = await notificacionDAO.actualizarNotificacion(id, idUsuario, mensaje, fechaEnvio, estado);
      if (!notificacionActualizada) {
        return next(new AppError('Notificacion no encontrada', 404));
      }
      res.status(200).json({
        status: 'success',
        data: notificacionActualizada,
      });
    } catch (error) {
      next(new AppError('Error al actualizar la notificacion', 500));
    }
  }

  // Eliminar una notificacion
  static async eliminarNotificacion(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await notificacionDAO.eliminarNotificacion(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar la notificacion', 500));
    }
  }
}

module.exports = NotificacionController;
