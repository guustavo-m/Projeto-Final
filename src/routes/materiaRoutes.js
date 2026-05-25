const express = require('express');
const router = express.Router();

const MateriaController = require('../controllers/materiaController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, MateriaController.listarTodos);

router.get('/:id', verificarToken, MateriaController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, MateriaController.criar);

router.put('/:id', verificarToken, verificarAdmin, MateriaController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, MateriaController.deletar);

module.exports = router;
