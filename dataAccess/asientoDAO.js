const { Asiento } = require('../models/Asiento');

class AsientoDAO {
    constructor() {}

    async crearAsiento(idVuelo, numAsiento, disponibilidad, tipoAsiento) {
        try {
            const asiento = await Asiento.create({ idVuelo, numAsiento, disponibilidad, tipoAsiento });
            return asiento;
        } catch (error) {
            throw error;
        }
    }

    async obtenerAsientos() {
        try {
            const asientos = await Asiento.findAll();
            return asientos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerAsientoPorId(id) {
        try {
            const asiento = await Asiento.findByPk(id);
            return asiento;
        } catch (error) {
            throw error;
        }
    }

    async actualizarAsiento(id, idVuelo, numAsiento, disponibilidad, tipoAsiento) {
        try {
            await Asiento.update({ idVuelo, numAsiento, disponibilidad, tipoAsiento }, { where: { id } });
            const asientoActualizado = await Asiento.findByPk(id);
            return asientoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarAsiento(id) {
        try {
            const asiento = await Asiento.findByPk(id);

            if (!asiento) {
                throw new Error('No existe el asiento');
            }
            await asiento.destroy();
            return 'Asiento eliminado correctamente';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AsientoDAO();