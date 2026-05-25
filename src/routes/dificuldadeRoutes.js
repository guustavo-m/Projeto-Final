const express = require('express');
const router = express.Router();

const DificuldadeController = require('../controllers/dificuldadeController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, DificuldadeController.listarTodos);

router.get('/:id', verificarToken, DificuldadeController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, DificuldadeController.criar);

router.put('/:id', verificarToken, verificarAdmin, DificuldadeController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, DificuldadeController.deletar);

module.exports = router;
