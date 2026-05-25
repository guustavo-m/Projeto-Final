const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuarioController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, UsuarioController.listarTodos);

router.get('/:id', verificarToken, UsuarioController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, UsuarioController.criar);

router.put('/:id', verificarToken, verificarAdmin, UsuarioController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, UsuarioController.deletar);

module.exports = router;
