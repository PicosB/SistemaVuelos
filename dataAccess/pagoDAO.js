const { Pago } = require('../models/Pago');

class PagoDAO {
    constructor() {}

    async crearPago(idReserva, monto, fechaPago, metodoPago, estado) {
        try {
            const pago = await Pago.create({ idReserva, monto, fechaPago, metodoPago, estado });
            return pago;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPagos() {
        try {
            const pagos = await Pago.findAll();
            return pagos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPagoPorId(id) {
        try {
            const pago = await Pago.findByPk(id);
            return pago;
        } catch (error) {
            throw error;
        }
    }

    async actualizarPago(id, idReserva, monto, fechaPago, metodoPago, estado) {
        try {
            await Pago.update({ idReserva, monto, fechaPago, metodoPago, estado }, { where: { id } });
            const pagoActualizado = await Pago.findByPk(id);
            return pagoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPago(id) {
        try {
            const pago = await Pago.findByPk(id);

            if (!pago) {
                throw new Error('No existe el pago');
            }
            await pago.destroy();
            return 'Pago eliminado correctamente';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PagoDAO();