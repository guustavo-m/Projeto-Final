const express = require('express');
const router = express.Router();

const DificuldadeController = require('../controllers/dificuldadeController');

router.get('/', DificuldadeController.listarTodos);

router.get('/:id', DificuldadeController.buscarPorId);

router.post('/', DificuldadeController.criar);

router.put('/:id', DificuldadeController.atualizar);

router.delete('/:id', DificuldadeController.deletar);

module.exports = router;
