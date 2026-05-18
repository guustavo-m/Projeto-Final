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

async function criar(req, res) {
  try {
    const { id_materia, nome_top } = req.body;
    
    if (!id_materia || !nome_top) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novoTopico = await TopicoModel.criar({ 
      id_materia,
      nome_top
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
    const { id_materia, nome_top } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!id_materia || !nome_top) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const topicoAtualizado = await TopicoModel.atualizar(id, { 
      id_materia,
      nome_top
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
  buscarPorId,
  criar,
  atualizar,
  deletar
};
