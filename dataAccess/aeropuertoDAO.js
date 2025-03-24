const { Aeropuerto } = require ('../models');

class AeropuertoDAO{
    constructor(){}

    //Crear Aeropuerto
    async crearAeropuerto(nombre,codigo,ciudad,pais){
        try{
            const aeropuerto = await Aeropuerto.create({nombre, codigo, ciudad, pais});
            return aeropuerto;
        } catch(error){
            throw error;
        }

    }

    //Obtener Aeropuertos
    async obtenerAeropuertos(){
        try{
            const aeropuertos = await Aeropuerto.findAll();
            return aeropuertos;
        } catch(error){
            throw error;
        }
    }

    //Obtener Aeropuerto por Id
    async obtenerAeropuertoPorId(id){
        try{
            const aeropuerto = await Aeropuerto.findByPk(id);
            return aeropuerto;
        } catch(error){
            throw error;
        }
    }

    //Actualizar Aeropuerto
    async actualizarAeropuerto(id, nombre, codigo, ciudad, pais){
        try{
            await Aeropuerto.update({nombre, codigo, ciudad, pais}, {where: {id}});
            const aeropuertoActualizado = await Aeropuerto.findByPk(id);
            return aeropuertoActualizado;
        } catch(error){
            throw error;
        }
    }

    //Eliminar Aeropuerto por Id
    async eliminarAeropuerto(id){
        try {
           const aeropuerto = await Aeropuerto.findByPk(id);
            if(!aeropuerto){
                throw new Error('Aeropuerto no encontrado');
            }
            await aeropuerto.destroy();
            return 'Aeropuerto Eliminado Correctamente'; 
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AeropuertoDAO();