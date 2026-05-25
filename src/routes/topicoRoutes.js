const express = require('express');
const router = express.Router();

const TopicoController = require('../controllers/topicoController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, TopicoController.listarTodos);

router.get('/:id', verificarToken, TopicoController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, TopicoController.criar);

router.put('/:id', verificarToken, verificarAdmin, TopicoController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, TopicoController.deletar);

module.exports = router;
