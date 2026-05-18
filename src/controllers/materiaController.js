const MateriasModel = require('../models/materiasModel');

async function listarTodos(req, res) {
  try {
    const materias = await MateriasModel.listarTodos();
    res.status(200).json(materias);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar materias', 
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
    
    const materia = await materiasModel.buscarPorId(id);
    
    if (materia) {
      res.status(200).json(materia);
    } else {
      res.status(404).json({ 
        mensagem: `Materia ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar materia',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nome_mat } = req.body;
    
    if (!nome_mat) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novaMateria = await materiasModel.criar({ 
      nome_mat
    });
    
    res.status(201).json(novaMateria);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar materia',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome_mat} = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome_mat) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const materiaAtualizado = await materiasModel.atualizar(id, { 
      nome_mat
    });
    
    if (materiaAtualizado) {
      res.status(200).json(materiaAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Materia ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar materia',
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
    
    const deletado = await materiasModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Materia ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Materia ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar materia',
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
