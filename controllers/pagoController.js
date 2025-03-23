const pagoDAO = require('../dataAccess/pagoDAO');
const { AppError } = require('../utils/appError');

class PagoController {

  // Crear un nuevo pago
  static async crearPago(req, res, next) {
    try {
      const { idReserva, monto, fechaPago, metodoPago, estado } = req.body;
      if (!idReserva || !monto || !fechaPago || !metodoPago || !estado) {
        return next(new AppError('Faltan datos requeridos: idReserva, monto, fechaPago, metodoPago o estado', 400));
      }
      const nuevoPago = await pagoDAO.crearPago(idReserva, monto, fechaPago, metodoPago, estado);
      res.status(201).json({
        status: 'success',
        data: nuevoPago,
      });
    } catch (error) {
      next(new AppError('Error al crear el pago', 500));
    }
  }

  // Obtener todos los pagos
  static async obtenerPagos(req, res, next) {
    try {
      const pagos = await pagoDAO.obtenerPagos();
      if (!pagos.length) {
        return next(new AppError('No se encontraron pagos', 404));
      }
      res.status(200).json({
        status: 'success',
        data: pagos,
      });
    } catch (error) {
      next(new AppError('Error al obtener los pagos', 500));
    }
  }

  // Obtener un pago por ID
  static async obtenerPagoPorId(req, res, next) {
    try {
      const { id } = req.params;
      const pago = await pagoDAO.obtenerPagoPorId(id);
      if (!pago) {
        return next(new AppError('Pago no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: pago,
      });
    } catch (error) {
      next(new AppError('Error al obtener el pago por ID', 500));
    }
  }

  // Actualizar un pago
  static async actualizarPago(req, res, next) {
    try {
      const { id } = req.params;
      const { idReserva, monto, fechaPago, metodoPago, estado } = req.body;
      const pagoActualizado = await pagoDAO.actualizarPago(id, idReserva, monto, fechaPago, metodoPago, estado);
      if (!pagoActualizado) {
        return next(new AppError('Pago no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: pagoActualizado,
      });
    } catch (error) {
      next(new AppError('Error al actualizar el pago', 500));
    }
  }

  // Eliminar un pago
  static async eliminarPago(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await pagoDAO.eliminarPago(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar el pago', 500));
    }
  }
}

module.exports = PagoController;
