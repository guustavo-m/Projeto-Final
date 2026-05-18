const QuestoesModel = require('../models/questoesModel');

async function listarTodos(req, res) {
  try {
    const questoes = await QuestoesModel.listarTodos();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar questões', 
      erro: erro.message 
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const questao = await QuestoesModel.buscarPorId(id);
    
    if (questao) {
      res.status(200).json(questao);
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar questão',
      erro: erro.message 
    });
  }
}

async function buscarComLike(req, res) {
  try {
    const { enunciado } = req.params;
    const questoes = await QuestoesModel.buscarComLike(enunciado);
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar questões com like',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { topicoid, enunciado, resposta, link_bib, dtinclusao } = req.body;
    
    if (!topicoid || !enunciado || !resposta || !link_bib || !dtinclusao) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novaQuestao = await QuestoesModel.criar({ 
      topicoid,
      enunciado,
      resposta,
      link_bib,
      dtinclusao
    });
    
    res.status(201).json(novaQuestao);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar questão',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { topicoid, enunciado, resposta, link_bib, dtinclusao } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!topicoid || !enunciado || !resposta || !link_bib || !dtinclusao) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const questaoAtualizado = await QuestoesModel.atualizar(id, { 
      topicoid,
      enunciado,
      resposta,
      link_bib,
      dtinclusao
    });
    
    if (questaoAtualizado) {
      res.status(200).json(questaoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar questão',
      erro: erro.message 
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await QuestoesModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Questão ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar questão',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarComLike,
  criar,
  atualizar,
  deletar
};
