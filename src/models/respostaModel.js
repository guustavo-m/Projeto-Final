const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM questoes ORDER BY idc'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM questoes WHERE idc = $1',
    [id]
  );
  return result.rows[0];
}

async function buscarComLike(nome) {
  const sql = 'SELECT enunciado, resposta FROM questoes WHERE enunciado ILIKE $1';
  
  const result = await pool.query(
    sql,
    [`%${nome}%`]
  );
  
  return result.rows;
}

async function criar(dados) {
  const { topicoid, enunciado, resposta, link_bib, dtinclusao } = dados;

  const sql = `
    INSERT INTO questoes (topicoid, enunciado, resposta, link_bib, dtinclusao)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [topicoid, enunciado, resposta, link_bib, dtinclusao]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { topicoid, enunciado, resposta, link_bib, dtinclusao } = dados;
  
  const sql = `
    UPDATE questoes
    SET topicoid = $1, enunciado = $2, resposta = $3, link_bib = $4, dtinclusao = $5
    WHERE idc = $6
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [topicoid, enunciado, resposta, link_bib, dtinclusao, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM questoes WHERE idc = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarComLike,
  criar,
  atualizar,
  deletar
};
