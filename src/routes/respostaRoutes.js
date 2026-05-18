const express = require('express');
const router = express.Router();

const RespostaController = require('../controllers/respostaController');

router.get('/', RespostaController.listarTodos);

router.get('/:id', RespostaController.buscarPorId);

router.post('/', RespostaController.criar);

router.put('/:id', RespostaController.atualizar);

router.delete('/:id', RespostaController.deletar);

module.exports = router;
