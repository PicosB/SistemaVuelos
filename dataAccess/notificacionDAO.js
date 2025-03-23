const { Notificacion } = require('../models/Notificacion');

class NotificacionDAO {
    constructor() {}

    async crearNotificacion(idUsuario, mensaje, fechaEnvio, estado) {
        try {
            const notificacion = await Notificacion.create({ idUsuario, mensaje, fechaEnvio, estado });
            return notificacion;
        } catch (error) {
            throw error;
        }
    }

    async obtenerNotificaciones() {
        try {
            const notificaciones = await Notificacion.findAll();
            return notificaciones;
        } catch (error) {
            throw error;
        }
    }

    async obtenerNotificacionPorId(id) {
        try {
            const notificacion = await Notificacion.findByPk(id);
            return notificacion;
        } catch (error) {
            throw error;
        }
    }

    async actualizarNotificacion(id, idUsuario, mensaje, fechaEnvio, estado) {
        try {
            await Notificacion.update({ idUsuario, mensaje, fechaEnvio, estado }, { where: { id } });
            const notificacionActualizada = await Notificacion.findByPk(id);
            return notificacionActualizada;
        } catch (error) {
            throw error;
        }
    }

    async eliminarNotificacion(id) {
        try {
            const notificacion = await Notificacion.findByPk(id);

            if (!notificacion) {
                throw new Error('No existe la notificación');
            }
            await notificacion.destroy();
            return 'Notificación eliminada correctamente';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new NotificacionDAO();