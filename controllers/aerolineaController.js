const aerolineaDAO = require('../dataAccess/aerolineaDAO');
const { AppError } = require('../utils/appError');

class AerolineaController {
  
  // Crear una nueva aerolinea
  static async crearAerolinea(req, res, next) {
    try {
      const { nombre, codigo } = req.body;
      if (!nombre || !codigo) {
        return next(new AppError('Faltan datos requeridos: nombre o código', 400));
      }
      const nuevaAerolinea = await aerolineaDAO.crearAerolinea(nombre, codigo);
      res.status(201).json({
        status: 'success',
        data: nuevaAerolinea,
      });
    } catch (error) {
      next(new AppError('Error al crear la Aerolinea', 500));
    }
  }
  
  // Obtener todas las aerolineas
  static async obtenerAerolineas(req, res, next) {
    try {
      const aerolineas = await aerolineaDAO.obtenerAerolineas();
      if (!aerolineas.length) {
        return next(new AppError('No se encontraron aerolineas', 404));
      }
      res.status(200).json({
        status: 'success',
        data: aerolineas,
      });
    } catch (error) {
      next(new AppError('Error al obtener las aerolineas', 500));
    }
  }

  // Obtener una aerolinea por ID
  static async obtenerAerolineaPorId(req, res, next) {
    try {
      const { id } = req.params;
      const aerolinea = await aerolineaDAO.obtenerAerolineaPorId(id);
      if (!aerolinea) {
        return next(new AppError('Aerolinea no encontrada', 404));
      }
      res.status(200).json({
        status: 'success',
        data: aerolinea,
      });
    } catch (error) {
      next(new AppError('Error al obtener la aerolinea por ID', 500));
    }
  }

  // Actualizar una aerolinea
  static async actualizarAerolinea(req, res, next) {
    try {
      const { id } = req.params;
      const { nombre, codigo } = req.body;
      const aerolineaActualizada = await aerolineaDAO.actualizarAerolinea(id, nombre, codigo);
      if (!aerolineaActualizada) {
        return next(new AppError('Aerolinea no encontrada', 404));
      }
      res.status(200).json({
        status: 'success',
        data: aerolineaActualizada,
      });
    } catch (error) {
      next(new AppError('Error al actualizar la aerolinea', 500));
    }
  }

  // Eliminar una aerolinea
  static async eliminarAerolinea(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await aerolineaDAO.eliminarAerolinea(id);
      res.status(200).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar la aerolinea', 500));
    }
  }
}

module.exports = AerolineaController;
