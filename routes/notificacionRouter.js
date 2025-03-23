const express = require('express');
const NotificacionController = require('../controllers/notificacionController');
const router = express.Router();

router.get('/', NotificacionController.obtenerNotificaciones);
router.get('/:id', NotificacionController.obtenerNotificacionPorId);
router.post('/', NotificacionController.crearNotificacion);
router.put('/:id', NotificacionController.actualizarNotificacion);
router.delete('/:id', NotificacionController.eliminarNotificacion);

module.exports = router;
