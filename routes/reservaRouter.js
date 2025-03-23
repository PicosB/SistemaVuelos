const express = require('express');
const ReservaController = require('../controllers/reservaController');
const router = express.Router();

router.get('/', ReservaController.obtenerReservas);
router.get('/:id', ReservaController.obtenerReservaPorId);
router.post('/', ReservaController.crearReserva);
router.put('/:id', ReservaController.actualizarReserva);
router.delete('/:id', ReservaController.eliminarReserva);

module.exports = router;
