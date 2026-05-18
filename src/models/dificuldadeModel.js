const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM dificuldade ORDER BY id_d'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM dificuldade WHERE id_d = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { topicoid, enunciado, resposta, link_bib, dtinclusao } = dados;

  const sql = `
    INSERT INTO dificuldade (grau)
    VALUES ($1)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [grau]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { grau } = dados;
  
  const sql = `
    UPDATE dificuldade
    SET grau = $1
    WHERE id_d = $2
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [grau, id_d]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM dificuldade WHERE id_d = $1',
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
