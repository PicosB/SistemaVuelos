const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const router = express.Router();
const autenticacion = require('../middleware/autenticacion');

router.post('/login', UsuarioController.login)
router.post('/', UsuarioController.crearUsuario);
router.get('/', autenticacion, UsuarioController.obtenerUsuarios);
router.get('/:id', autenticacion, UsuarioController.obtenerUsuarioPorId);
router.put('/:id', autenticacion, UsuarioController.actualizarUsuario);
router.delete('/:id', autenticacion, UsuarioController.eliminarUsuario);

module.exports = router;
