const DificuldadeModel = require('../models/dificuldadeModel');

async function listarTodos(req, res) {
  try {
    const dificuldades = await DificuldadeModel.listarTodos();
    res.status(200).json(dificuldades);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar dificuldade', 
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
    
    const dificuldade = await DificuldadeModel.buscarPorId(id);
    
    if (dificuldade) {
      res.status(200).json(dificuldade);
    } else {
      res.status(404).json({ 
        mensagem: `Dificuldade ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar dificuldade',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { grau } = req.body;
    
    if (!grau) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novaDificuldade = await DificuldadeModel.criar({ 
      grau
    });
    
    res.status(201).json(novaDificuldade);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar dificuldade',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { grau } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!grau) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const grauAtualizado = await DificuldadeModel.atualizar(id, { 
      grau
    });
    
    if (grauAtualizado) {
      res.status(200).json(grauAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Dificuldade ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar dificuldade',
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
    
    const deletado = await DificuldadeModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Dificuldade ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Dificuldade ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar dificuldade',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  criar,
  buscarPorId,
  atualizar,
  deletar
};
