const express = require('express');
const AsientoController = require('../controllers/asientoController');
const router = express.Router();

router.get('/', AsientoController.obtenerAsientos);
router.get('/:id', AsientoController.obtenerAsientoPorId);
router.post('/', AsientoController.crearAsiento);
router.put('/:id', AsientoController.actualizarAsiento);
router.delete('/:id', AsientoController.eliminarAsiento);

module.exports = router;