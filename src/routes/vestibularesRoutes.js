const express = require('express');
const router = express.Router();

const VestibularesController = require('../controllers/vestibularesController');

router.get('/', VestibularesController.listarTodos);

router.get('/:id', VestibularesController.buscarPorId);

router.post('/', VestibularesController.criar);

router.put('/:id', VestibularesController.atualizar);

router.delete('/:id', VestibularesController.deletar);

module.exports = router;
