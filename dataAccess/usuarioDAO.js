const { Usuario } = require('../models');

class UsuarioDAO{
    constructor() {}

    //Autenticacion
    async autenticarUsuario(correo, contraseña) {
        try {
            const usuario = await Usuario.findOne({ where: { correo, contraseña } });

            console.log('Usuario encontrado:', usuario);
    
            if (!usuario) {
                throw new Error('Usuario o contraseña incorrectos');
            }
    
            return usuario;
        } catch (error) {
            console.error('Error en autenticación:', error);
            throw error;
        }
    }
    

    //Crear Usuarios
    async crearUsuario(nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol) {
        try {
            const usuario = await Usuario.create({ nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol });
            return usuario;
        } catch (error) {
            console.error('Error en crearUsuario:', error);
            throw error;
        }
    }

    //Obtener Usuarios
    async obtenerUsuarios(){
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            throw error;
        }
    }

    //Obtener Usuario por Id
    async obtenerUsuarioPorId(id){
        try {
            const usuario = await Usuario.findByPk(id);
            return usuario;
        } catch (error) {
            throw error;
       }
    }

    //Actualizar Usuario
    async actualizarUsuario(id, nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol){
        try {
            await Usuario.update({nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numTelefono, rol}, {where: { id }});
            const usuarioActualizado = await Usuario.findByPk(id);
            return usuarioActualizado;
        } catch (error) {
            throw error;
        }
    }

    //Eliminar Usuario por Id
    async eliminarUsuario(id){
        try {
            const usuario = await Usuario.findByPk(id);

            if(!usuario){
                throw new Error('No existe el usuario');
            }
            await usuario.destroy();
            return 'Usuario Eliminado correctamente'
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new UsuarioDAO();