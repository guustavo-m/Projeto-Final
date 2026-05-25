const express = require('express');
const router = express.Router();

const RespostaController = require('../controllers/respostaController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, RespostaController.listarTodos);

router.get('/:id', verificarToken, RespostaController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, RespostaController.criar);

router.put('/:id', verificarToken, verificarAdmin, RespostaController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, RespostaController.deletar);

module.exports = router;
