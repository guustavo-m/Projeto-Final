const RespostasModel = require('../models/questoesModel');

async function listarTodos(req, res) {
  try {
    const respostas = await RespostasModel.listarTodos();
    res.status(200).json(respostas);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar respostas', 
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
    
    const resposta = await RespostasModel.buscarPorId(id);
    
    if (resposta) {
      res.status(200).json(resposta);
    } else {
      res.status(404).json({ 
        mensagem: `Resposta ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar resposta',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { id_resp, resp_correta, explicacao_prof, contas_url,videoaula} = req.body;
    
    if (! id_resp || !resp_correta || !explicacao_prof || !contas_url || !videoaula) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novaresposta = await QuestoesModel.criar({ 
    id_resp, 
    resp_correta,
    explicacao_prof, 
    contas_url,
    videoaula
    });
    
    res.status(201).json(novaresposta);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar resposta',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { id_resp, resp_correta, explicacao_prof, contas_url,videoaula} = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (! id_resp || !resp_correta || !explicacao_prof || !contas_url || !videoaula) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const respostaAtualizado = await QuestoesModel.atualizar(id, { 
      id_resp, 
      resp_correta,
      explicacao_prof, 
      contas_url,
      videoaula
    });
    
    if (respostaAtualizado) {
      res.status(200).json(respostaAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Resposta ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar resposta',
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
        mensagem: `Resposta ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Resposta ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar resposta',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
