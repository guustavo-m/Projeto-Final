const express = require('express');
const router = express.Router();

const QuestoesController = require('../controllers/questoesController');

const { verificarToken } = require('../middleware/authMiddleware');

const { verificarAdmin } = require('../middleware/adminMiddleware');

router.get('/', verificarToken, QuestoesController.listarTodos);

router.get('/vestibular/:vestibular', verificarToken, QuestoesController.listarPorVestibular);

router.get('/materia/:materia', verificarToken, QuestoesController.listarPorMateria);

router.get('/topico/:topico', verificarToken, QuestoesController.listarPorTopico);

router.get('/:id', verificarToken, QuestoesController.buscarPorId);

router.post('/', verificarToken, verificarAdmin, QuestoesController.criar);

router.put('/:id', verificarToken, verificarAdmin, QuestoesController.atualizar);

router.delete('/:id', verificarToken, verificarAdmin, QuestoesController.deletar);

module.exports = router;