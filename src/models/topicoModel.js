const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM topico ORDER BY id_top'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM topico WHERE id_top = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { id_materia, nome_top } = dados;

  const sql = `
    INSERT INTO topico (id_materia, nome_top)
    VALUES ($1, $2)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [id_materia, nome_top]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { id_materia, nome_top } = dados;
  
  const sql = `
    UPDATE topico
    SET id_materia = $1, nome_top = $2
    WHERE id_top = $3
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [id_materia, nome_top, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM topico WHERE id_top = $1',
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
