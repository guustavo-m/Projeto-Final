const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensagem: 'E-mail e senha são obrigatórios'
      });
    }

    const usuarios = await UsuarioModel.listarTodos();

    const usuario = usuarios.find(
      user => user.email === email && user.senha === password
    );

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'Credenciais inválidas'
      });
    }

    const payload = {
      id: usuario.id_user,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      usuario: {
        id: usuario.id_user,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro no login',
      erro: erro.message
    });
  }
}

module.exports = {
  login
};