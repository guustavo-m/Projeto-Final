const express = require('express');
const router = express.Router();

const TopicoController = require('../controllers/topicoController');

router.get('/', TopicoController.listarTodos);

router.get('/view', TopicoController.listarPorView);

router.get('/topico/:topico/disciplina/:disciplina', TopicoController.topicoDisciplina);

router.get('/disciplina/:disciplina', TopicoController.listarPorDisciplina);

router.get('/topico/:topico', TopicoController.buscarPorTopico);

router.get('/:id', TopicoController.buscarPorId);

router.post('/', TopicoController.criar);

router.put('/:id', TopicoController.atualizar);

router.delete('/:id', TopicoController.deletar);

module.exports = router;
