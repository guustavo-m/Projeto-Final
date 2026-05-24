const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM materia ORDER BY id_mat'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM materia WHERE id_mat = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nome_mat } = dados;

  const sql = `
    INSERT INTO materia (nome_mat)
    VALUES ($1)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome_mat]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome_mat } = dados;
  
  const sql = `
    UPDATE materia
    SET nome_mat = $1
    WHERE id_mat = $2
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome_mat, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM materia WHERE id_mat = $1',
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
