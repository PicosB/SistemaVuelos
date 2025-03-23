const express = require('express');
const AerolineaController = require('../controllers/aerolineaController');
const router = express.Router();

router.get('/', AerolineaController.obtenerAerolineas);
router.get('/:id', AerolineaController.obtenerAerolineaPorId);
router.post('/', AerolineaController.crearAerolinea);
router.put('/:id', AerolineaController.actualizarAerolinea);
router.delete('/:id', AerolineaController.eliminarAerolinea);

module.exports = router;