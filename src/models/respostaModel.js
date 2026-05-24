const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM resposta ORDER BY id_resp'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM resposta WHERE id_resp = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { resp_correta, explicacao_prof, contas_url, videoaula } = dados;

  const sql = `
    INSERT INTO resposta (resp_correta, explicacao_prof, contas_url, videoaula)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [resp_correta, explicacao_prof, contas_url, videoaula]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { resp_correta, explicacao_prof, contas_url, videoaula } = dados;
  
  const sql = `
    UPDATE resposta
    SET resp_correta = $1, explicacao_prof = $2, contas_url = $3, videoaula = $4
    WHERE id_resp = $5
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [resp_correta, explicacao_prof, contas_url, videoaula, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM resposta WHERE id_resp = $1',
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
