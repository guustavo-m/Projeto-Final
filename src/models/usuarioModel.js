const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM usuario ORDER BY id_user'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM usuario WHERE id_user = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nome, email, senha, tipo } = dados;

  const sql = `
    INSERT INTO usuario (nome, email, senha, tipo)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, email, senha, tipo || "usuario"]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, email, senha, tipo } = dados;
  
  const sql = `
    UPDATE usuario
    SET nome = $1, email = $2, senha = $3, tipo = $4
    WHERE id_user = $5
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, email, senha, tipo, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM usuario WHERE id_user = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
