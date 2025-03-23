const express = require('express');
const PagoController = require('../controllers/pagoController');
const router = express.Router();

router.get('/', PagoController.obtenerPagos);
router.get('/:id', PagoController.obtenerPagoPorId);
router.post('/', PagoController.crearPago);
router.put('/:id', PagoController.actualizarPago);
router.delete('/:id', PagoController.eliminarPago);

module.exports = router;