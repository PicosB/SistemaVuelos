const { Aerolinea } = require ('../models/Aerolinea');

class AerolineaDAO{
    constructor() {}

    //Crear Aerolinea
    async crearAerolinea(nombre, codigo){
        try {
            const aerolinea = await Aerolinea.create({nombre, codigo});
            return aerolinea;
        } catch (error) {
            throw error;
        }
    }

    //Obtener Aerolineas
    async obtenerAerolineas() {
        try {
            const aerolineas = await Aerolinea.findAll();
            return aerolineas;
        } catch (error) {
            throw error;
        }
    }

    //Obtener Aerolineas por Id
    async obtenerAerolineaPorId(id) {
        try {
            const aerolinea = await Aerolinea.findByPk(id);
            return aerolinea;
        } catch (error) {
            throw error;
        }
    }

    //Actualizar Aerolinea
    async actualizarAerolinea(id, nombre, codigo) {
        try {
            await Aerolinea.update({ nombre, codigo }, { where: { id } });
            const aerolineaActualizada = await Aerolinea.findByPk(id);
            return aerolineaActualizada;
        } catch (error) {
            throw error;
        }
    }


    //Eliminar Aerolinea
    async eliminarAerolinea(id) {
        try {
            const aerolinea = await Aerolinea.findByPk(id);

            if (!aerolinea) {
                throw new Error('No existe la aerolInea');
            }
            await aerolinea.destroy();
            return 'AerolInea eliminada correctamente';
        } catch (error) {
            throw error;
        }
    }

}
module.exports = new AerolineaDAO();