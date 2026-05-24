const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM questoes ORDER BY idq'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM questoes WHERE idq = $1',
    [id]
  );
  return result.rows[0];
}

async function listarPorVestibular(vest) {
  const sql = 'select * from select_vestibular where sigla ilike $1';
  
  const result = await pool.query(
    sql,
    [`%${vest}%`]
  );
  
  return result.rows;
}

async function listarPorMateria(materia) {
  const sql = 'select * from select_materia where materia ilike $1';
  
  const result = await pool.query(
    sql,
    [`%${materia}%`]
  );
  
  return result.rows;
}

async function listarPorTopico(topico) {
  const sql = 'select * from select_topico where topico ilike $1';
  
  const result = await pool.query(
    sql,
    [`%${topico}%`]
  );
  
  return result.rows;
}

async function criar(dados) {
  const { idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url } = dados;

  const sql = `
    INSERT INTO questoes (idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url } = dados;
  
  const sql = `
    UPDATE questoes
    SET idvest = $1, idresp = $2, idtopico = $3, graudif = $4, ano = $5, enunciado = $6, alt_a = $7, alt_b = $8, alt_c = $9, alt_d = $10, alt_e = $11, imagem_url = $12
    WHERE idq = $13
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [idvest, idresp, idtopico, graudif, ano, enunciado, alt_a, alt_b, alt_c, alt_d, alt_e, imagem_url, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM questoes WHERE idq = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  listarPorVestibular,
  listarPorMateria,
  listarPorTopico,
  criar,
  atualizar,
  deletar
};
