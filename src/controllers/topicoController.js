const TopicoModel = require('../models/topicoModel');

async function listarTodos(req, res) {
  try {
    const topicos = await TopicoModel.listarTodos();
    res.status(200).json(topicos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar tópicos', 
      erro: erro.message 
    });
  }
}

async function listarPorView(req, res) {
  try {
    const topicos = await TopicoModel.listarPorView();
    res.status(200).json(topicos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar a view matemática', 
      erro: erro.message 
    });
  }
}

async function listarPorDisciplina(req, res) {
  try {
    const { disciplina } = req.params;
    const topicos = await TopicoModel.listarPorDisciplina(disciplina);
    res.status(200).json(topicos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar tópico por disciplina',
      erro: erro.message 
    });
  }
}

async function topicoDisciplina(req, res) {
  try {
    const { topico, disciplina } = req.params;
    const resultado = await TopicoModel.topicoDisciplina(topico, disciplina);
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar por tópico e disciplina',
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
    
    const topico = await TopicoModel.buscarPorId(id);
    
    if (topico) {
      res.status(200).json(topico);
    } else {
      res.status(404).json({ 
        mensagem: `Tópico ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar tópico',
      erro: erro.message 
    });
  }
}

async function buscarPorTopico(req, res) {
  try {
    const topico = parseInt(req.params.topico);
    
    if (isNaN(topico)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const topicos = await TopicoModel.buscarPorTopico(topico);
    
    if (topicos) {
      res.status(200).json(topicos);
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${topico} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { disciplina, professor, descricao_topico } = req.body;
    
    if (!disciplina || !professor || !descricao_topico) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novoTopico = await TopicoModel.criar({ 
      disciplina,
      professor,
      descricao_topico
    });
    
    res.status(201).json(novoTopico);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar tópico',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { disciplina, professor, descricao_topico } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!disciplina || !professor || !descricao_topico) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const topicoAtualizado = await TopicoModel.atualizar(id, { 
      disciplina,
      professor,
      descricao_topico
    });
    
    if (topicoAtualizado) {
      res.status(200).json(topicoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Tópico ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar tópico',
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
    
    const deletado = await TopicoModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Tópico ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Tópico ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar tópico',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  listarPorView,
  buscarPorId,
  buscarPorTopico,
  listarPorDisciplina,
  topicoDisciplina,
  criar,
  atualizar,
  deletar
};
