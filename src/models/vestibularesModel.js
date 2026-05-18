const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM vestibulares ORDER BY ID'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM vestibulares WHERE ID = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nome, sigla } = dados;

  const sql = `
    INSERT INTO vestibulares (nome, sigla)
    VALUES ($1, $2)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, sigla]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, sigla } = dados;
  
  const sql = `
    UPDATE vestibulares
    SET nome = $1, sigla = $2
    WHERE ID = $3
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, sigla, ID]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM vestibulares WHERE ID = $1',
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
