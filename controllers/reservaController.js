const reservaDAO = require('../dataAccess/reservaDAO');
const { AppError } = require('../utils/appError');

class ReservaController {

  // Crear una nueva reserva
  static async crearReserva(req, res, next) {
    try {
      const { idUsuario, idVuelo, fechaReservacion, estado } = req.body;
      if (!idUsuario || !idVuelo || !fechaReservacion || !estado) {
        return next(new AppError('Faltan datos requeridos: idUsuario, idVuelo, fechaReservacion o estado', 400));
      }
      const nuevaReserva = await reservaDAO.crearReserva(idUsuario, idVuelo, fechaReservacion, estado);
      res.status(201).json({
        status: 'success',
        data: nuevaReserva,
      });
    } catch (error) {
      next(new AppError('Error al crear la reserva', 500));
    }
  }

  // Obtener todas las reservas
  static async obtenerReservas(req, res, next) {
    try {
      const reservas = await reservaDAO.obtenerReservas();
      if (!reservas.length) {
        return next(new AppError('No se encontraron reservas', 404));
      }
      res.status(200).json({
        status: 'success',
        data: reservas,
      });
    } catch (error) {
      next(new AppError('Error al obtener las reservas', 500));
    }
  }

  // Obtener una reserva por ID
  static async obtenerReservaPorId(req, res, next) {
    try {
      const { id } = req.params;
      const reserva = await reservaDAO.obtenerReservaPorId(id);
      if (!reserva) {
        return next(new AppError('Reserva no encontrada', 404));
      }
      res.status(200).json({
        status: 'success',
        data: reserva,
      });
    } catch (error) {
      next(new AppError('Error al obtener la reserva por ID', 500));
    }
  }

  // Actualizar una reserva
  static async actualizarReserva(req, res, next) {
    try {
      const { id } = req.params;
      const { idUsuario, idVuelo, fechaReservacion, estado } = req.body;
      const reservaActualizada = await reservaDAO.actualizarReserva(id, idUsuario, idVuelo, fechaReservacion, estado);
      if (!reservaActualizada) {
        return next(new AppError('Reserva no encontrada', 404));
      }
      res.status(200).json({
        status: 'success',
        data: reservaActualizada,
      });
    } catch (error) {
      next(new AppError('Error al actualizar la reserva', 500));
    }
  }

  // Eliminar una reserva
  static async eliminarReserva(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await reservaDAO.eliminarReserva(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar la reserva', 500));
    }
  }
}

module.exports = ReservaController;
