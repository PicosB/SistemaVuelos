const express = require('express');
const VueloController = require('../controllers/vueloController');
const router = express.Router();

router.get('/buscar', VueloController.obtenerVuelosPorCriterios);
router.get('/', VueloController.obtenerVuelos);
router.get('/:id', VueloController.obtenerVueloPorId);
router.post('/', VueloController.crearVuelo);
router.put('/:id', VueloController.actualizarVuelo);
router.delete('/:id', VueloController.eliminarVuelo);

module.exports = router;
