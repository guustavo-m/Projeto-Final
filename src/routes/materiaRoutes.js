const express = require('express');
const router = express.Router();

const MateriaController = require('../controllers/materiaController');

router.get('/', MateriaController.listarTodos);

router.get('/:id', MateriaController.buscarPorId);

router.post('/', MateriaController.criar);

router.put('/:id', MateriaController.atualizar);

router.delete('/:id', MateriaController.deletar);

module.exports = router;
