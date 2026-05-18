const express = require('express');
const router = express.Router();

const QuestoesController = require('../controllers/questoesController');

router.get('/', QuestoesController.listarTodos);

router.get('/:id', QuestoesController.buscarPorId);

router.post('/', QuestoesController.criar);

router.put('/:id', QuestoesController.atualizar);

router.delete('/:id', QuestoesController.deletar);

module.exports = router;
