const { Vuelo } = require('../models/Vuelo');

class VueloDAO {
    constructor() {}

    async crearVuelo(origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea) {
        try {
            const vuelo = await Vuelo.create({ origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea });
            return vuelo;
        } catch (error) {
            throw error;
        }
    }

    async obtenerVuelos() {
        try {
            const vuelos = await Vuelo.findAll();
            return vuelos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerVueloPorId(id) {
        try {
            const vuelo = await Vuelo.findByPk(id);
            return vuelo;
        } catch (error) {
            throw error;
        }
    }

    async actualizarVuelo(id, origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea) {
        try {
            await Vuelo.update({ origen, destino, fechaSalida, fechaLlegada, precio, idAeropuerto, idAerolinea }, { where: { id } });
            const vueloActualizado = await Vuelo.findByPk(id);
            return vueloActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarVuelo(id) {
        try {
            const vuelo = await Vuelo.findByPk(id);

            if (!vuelo) {
                throw new Error('No existe el vuelo');
            }
            await vuelo.destroy();
            return 'Vuelo eliminado correctamente';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new VueloDAO();