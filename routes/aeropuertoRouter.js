const express = require('express');
const AeropuertoController = require('../controllers/aeropuertoController');
const router = express.Router();

router.get('/', AeropuertoController.obtenerAeropuertos);
router.get('/:id', AeropuertoController.obtenerAeropuertoPorId);
router.post('/', AeropuertoController.crearAeropuerto);
router.put('/:id', AeropuertoController.actualizarAeropuerto);
router.delete('/:id', AeropuertoController.eliminarAeropuerto);

module.exports = router;
