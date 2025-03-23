const boletoDAO = require('../dataAccess/boletoDAO');
const { AppError } = require('../utils/appError');

class BoletoController {

  // Crear un nuevo boleto
  static async crearBoleto(req, res, next) {
    try {
      const { idReserva, idAsiento } = req.body;
      if (!idReserva || !idAsiento) {
        return next(new AppError('Faltan datos requeridos: idReserva o idAsiento', 400));
      }
      const nuevoBoleto = await boletoDAO.crearBoleto(idReserva, idAsiento);
      res.status(201).json({
        status: 'success',
        data: nuevoBoleto,
      });
    } catch (error) {
      next(new AppError('Error al crear el Boleto', 500));
    }
  }

  // Obtener todos los boletos
  static async obtenerBoletos(req, res, next) {
    try {
      const boletos = await boletoDAO.obtenerBoletos();
      if (!boletos.length) {
        return next(new AppError('No se encontraron boletos', 404));
      }
      res.status(200).json({
        status: 'success',
        data: boletos,
      });
    } catch (error) {
      next(new AppError('Error al obtener los boletos', 500));
    }
  }

  // Obtener un boleto por ID
  static async obtenerBoletoPorId(req, res, next) {
    try {
      const { id } = req.params;
      const boleto = await boletoDAO.obtenerBoletoPorId(id);
      if (!boleto) {
        return next(new AppError('Boleto no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: boleto,
      });
    } catch (error) {
      next(new AppError('Error al obtener el boleto por ID', 500));
    }
  }

  // Actualizar un boleto
  static async actualizarBoleto(req, res, next) {
    try {
      const { id } = req.params;
      const { idReserva, idAsiento } = req.body;
      const boletoActualizado = await boletoDAO.actualizarBoleto(id, idReserva, idAsiento);
      if (!boletoActualizado) {
        return next(new AppError('Boleto no encontrado', 404));
      }
      res.status(200).json({
        status: 'success',
        data: boletoActualizado,
      });
    } catch (error) {
      next(new AppError('Error al actualizar el boleto', 500));
    }
  }

  // Eliminar un boleto
  static async eliminarBoleto(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await boletoDAO.eliminarBoleto(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar el boleto', 500));
    }
  }
}

module.exports = BoletoController;
