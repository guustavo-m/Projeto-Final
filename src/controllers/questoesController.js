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

async function listarPorVestibular(req, res) {
  try {
    const vestibulares = await QuestoesModel.listarPorVestibular();
    res.status(200).json(vestibulares);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar por vestibulares', 
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url } = req.body;
    
    if (!idvest || !idresp || !idtopico || !graudif || !ano || !enunciado || !alt_a || !alt_b || !alt_c || !alt_d || !alt_e ||!imagem_url) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novaQuestao = await QuestoesModel.criar({ 
      idvest,
      idresp,
      idtopico, 
      graudif, 
      ano, 
      enunciado, 
      alt_a, 
      alt_b, 
      alt_c, 
      alt_d, 
      alt_e, 
      imagem_url
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
    const { idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!idvest || !idresp || !idtopico || !graudif || !ano || !enunciado || !alt_a || !alt_b || !alt_c || !alt_d || !alt_e ||!imagem_url) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const questaoAtualizado = await QuestoesModel.atualizar(id, { 
      idvest,
      idresp,
      idtopico, 
      graudif, 
      ano, 
      enunciado, 
      alt_a, 
      alt_b, 
      alt_c, 
      alt_d, 
      alt_e, 
      imagem_url
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
  listarPorVestibular,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
