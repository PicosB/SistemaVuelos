const { Reserva } = require('../models/Reserva');

class ReservaDAO {
    constructor() {}

    async crearReserva(idUsuario, idVuelo, fechaReservacion, estado) {
        try {
            const reserva = await Reserva.create({ idUsuario, idVuelo, fechaReservacion, estado });
            return reserva;
        } catch (error) {
            throw error;
        }
    }

    async obtenerReservas() {
        try {
            const reservas = await Reserva.findAll();
            return reservas;
        } catch (error) {
            throw error;
        }
    }

    async obtenerReservaPorId(id) {
        try {
            const reserva = await Reserva.findByPk(id);
            return reserva;
        } catch (error) {
            throw error;
        }
    }

    async actualizarReserva(id, idUsuario, idVuelo, fechaReservacion, estado) {
        try {
            await Reserva.update({ idUsuario, idVuelo, fechaReservacion, estado }, { where: { id } });
            const reservaActualizada = await Reserva.findByPk(id);
            return reservaActualizada;
        } catch (error) {
            throw error;
        }
    }

    async eliminarReserva(id) {
        try {
            const reserva = await Reserva.findByPk(id);

            if (!reserva) {
                throw new Error('No existe la reserva');
            }
            await reserva.destroy();
            return 'Reserva eliminada correctamente';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ReservaDAO();