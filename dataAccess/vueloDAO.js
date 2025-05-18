const { Vuelo } = require('../models');
const { Op, fn, col, where } = require('sequelize');


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
            const vuelos = await Vuelo.findAll({
                attributes: ['id', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'precio', 'idAeropuerto', 'idAerolinea']
            });
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

    async obtenerVuelosPorCriterios(origen, destino, fechaSalida) {
    try {
      const vuelos = await Vuelo.findAll({
        where: {
          [Op.and]: [
            where(
              fn('LOWER', fn('REPLACE', col('origen'), 'á', 'a')),
              origen.toLowerCase().replace('á', 'a')
            ),
            where(
              fn('LOWER', fn('REPLACE', col('destino'), 'á', 'a')),
              destino.toLowerCase().replace('á', 'a')
            ),
            where(fn('DATE', col('fechaSalida')), fechaSalida)
          ]
        },
        attributes: [
          'id', 'origen', 'destino', 'fechaSalida',
          'fechaLlegada', 'precio', 'idAeropuerto', 'idAerolinea'
        ]
      });
      return vuelos;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new VueloDAO();