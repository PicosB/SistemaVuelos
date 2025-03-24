const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/login', UsuarioController.login)
router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id', UsuarioController.obtenerUsuarioPorId);
router.post('/', UsuarioController.crearUsuario);
router.put('/:id', UsuarioController.actualizarUsuario);
router.delete('/:id', UsuarioController.eliminarUsuario);

module.exports = router;
