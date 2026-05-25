const express = require('express');
const router = express.Router();

const VestibularesController = require('../controllers/vestibularesController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, VestibularesController.listarTodos);

router.get('/:id', verificarToken, VestibularesController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, VestibularesController.criar);

router.put('/:id', verificarToken, verificarAdmin, VestibularesController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, VestibularesController.deletar);

module.exports = router;
