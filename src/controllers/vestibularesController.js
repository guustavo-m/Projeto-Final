const VestibularesModel = require('../models/vestibularesModel');

async function listarTodos(req, res) {
  try {
    const vestibulares = await VestibularesModel.listarTodos();
    res.status(200).json(vestibulares);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar vestibulares', 
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
    
    const vestibular = await VestibularesModel.buscarPorId(id);
    
    if (vestibular) {
      res.status(200).json(vestibular);
    } else {
      res.status(404).json({ 
        mensagem: `Vestibular ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, sigla } = req.body;
    
    if (!nome || !sigla) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novavestibular = await VestibularesModel.criar({ 
      nome,
      sigla
    });
    
    res.status(201).json(novavestibular);
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
    const { nome, sigla } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome || !sigla) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const vestibularAtualizado = await VestibularesModel.atualizar(id, { 
      nome,
      sigla
    });
    
    if (vestibularAtualizado) {
      res.status(200).json(vestibularAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Vestibular ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar vestibular',
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
    
    const deletado = await VestibularesModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Vestibular ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Vestibular ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar vestibular',
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
