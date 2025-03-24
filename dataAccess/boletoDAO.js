const { Boleto } = require('../models');

class BoletoDAO {
    constructor() {}

    async crearBoleto(idReserva, idAsiento) {
        try {
            const boleto = await Boleto.create({ idReserva, idAsiento });
            return boleto;
        } catch (error) {
            throw error;
        }
    }

    async obtenerBoletos() {
        try {
            const boletos = await Boleto.findAll();
            return boletos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerBoletoPorId(id) {
        try {
            const boleto = await Boleto.findByPk(id);
            return boleto;
        } catch (error) {
            throw error;
        }
    }

    async actualizarBoleto(id, idReserva, idAsiento) {
        try {
            await Boleto.update({ idReserva, idAsiento }, { where: { id } });
            const boletoActualizado = await Boleto.findByPk(id);
            return boletoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarBoleto(id) {
        try {
            const boleto = await Boleto.findByPk(id);

            if (!boleto) {
                throw new Error('No existe el boleto');
            }
            await boleto.destroy();
            return 'Boleto eliminado correctamente';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BoletoDAO();