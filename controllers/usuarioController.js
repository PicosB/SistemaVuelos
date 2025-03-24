const UsuarioDAO = require('../dataAccess/usuarioDAO');
const { AppError } = require('../utils/appError');
const { createToken, ensureTokenIsValid } = require('../utils/token-util')

class UsuarioController {

  static async login(req, res, next) {
    try {
        const { correo, contraseña } = req.body;
        if (!correo || !contraseña) {
            return next(new AppError('Faltan datos requeridos: correo y contraseña', 400));
        }

        const usuario = await UsuarioDAO.autenticarUsuario(correo, contraseña);
        if (!usuario) {
            return next(new AppError('Credenciales incorrectas', 401));
        }

        const token = createToken(correo)
        
        res.status(201).json({
            status: 'success',
            message: 'Autenticación exitosa',
            data: usuario,
            token: token
        });
    } catch (error) {
        next(new AppError('Error en el proceso de autenticación', 500));
    }
}

  // Crear un nuevo usuario
  static async crearUsuario(req, res, next) {
    try {
      const { nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol } = req.body;
      if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !contraseña || !numTelefono || !rol) {
        return next(new AppError('Faltan datos requeridos: nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono o rol', 400));
      }
      const nuevoUsuario = await UsuarioDAO.crearUsuario(nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol);
      res.status(201).json({
        status: 'success',
        data: nuevoUsuario
      });
    } catch (error) {
      console.error('Error al crear el usuario en el controlador:', error);
      next(new AppError('Error al crear el usuario', 500));
    }
  }  

  // Obtener todos los usuarios
  static async obtenerUsuarios(req, res, next) {
    try {
      const usuarios = await UsuarioDAO.obtenerUsuarios();
      if (!usuarios.length) {
        return next(new AppError('No se encontraron usuarios', 404));
      }
      res.status(201).json({
        status: 'success',
        data: usuarios,
      });
    } catch (error) {
      next(new AppError('Error al obtener los usuarios', 500));
    }
  }

  // Obtener un usuario por ID
  static async obtenerUsuarioPorId(req, res, next) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioDAO.obtenerUsuarioPorId(id);
      if (!usuario) {
        return next(new AppError('Usuario no encontrado', 404));
      }
      res.status(201).json({
        status: 'success',
        data: usuario,
      });
    } catch (error) {
      next(new AppError('Error al obtener el usuario por ID', 500));
    }
  }

  // Actualizar un usuario
  static async actualizarUsuario(req, res, next) {
    try {
      const { id } = req.params;
      const { nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol } = req.body;
      const usuarioActualizado = await UsuarioDAO.actualizarUsuario(id, nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol);
      if (!usuarioActualizado) {
        return next(new AppError('Usuario no encontrado', 404));
      }
      res.status(201).json({
        status: 'success',
        data: usuarioActualizado,
      });
    } catch (error) {
      next(new AppError('Error al actualizar el usuario', 500));
    }
  }

  // Eliminar un usuario
  static async eliminarUsuario(req, res, next) {
    try {
      const { id } = req.params;
      const mensaje = await UsuarioDAO.eliminarUsuario(id);
      res.status(201).json({
        status: 'success',
        message: mensaje,
      });
    } catch (error) {
      next(new AppError('Error al eliminar el usuario', 500));
    }
  }
}

module.exports = UsuarioController;
