const express = require('express');
const BoletoController = require('../controllers/boletoController');
const router = express.Router();

router.get('/', BoletoController.obtenerBoletos);
router.get('/:id', BoletoController.obtenerBoletoPorId);
router.post('/', BoletoController.crearBoleto);
router.put('/:id', BoletoController.actualizarBoleto);
router.delete('/:id', BoletoController.eliminarBoleto);

module.exports = router;
