const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM topicos ORDER BY idt'
  );
  return result.rows;
}

async function listarPorView() {
  const result = await pool.query(
    'SELECT * FROM matematica'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM topicos WHERE idt = $1',
    [id]
  );
  return result.rows[0];
}

async function listarPorDisciplina(disc) {
  // ILIKE é o LIKE case-insensitive do PostgreSQL
  // (no SQLite usávamos LIKE normal)
  const sql = 'select q.enunciado, q.resposta from questoes as q inner join topicos as t on t.idt = q.topicoid where t.disciplina ilike $1';
  
  const result = await pool.query(
    sql,
    [`%${disc}%`]  // % = wildcard (qualquer texto)
  );
  
  return result.rows;
}

async function topicoDisciplina(topic, disc) {
  // ILIKE é o LIKE case-insensitive do PostgreSQL
  // (no SQLite usávamos LIKE normal)
  const sql = 'select q.enunciado, q.resposta from questoes as q inner join topicos as t on t.idt = q.topicoid where t.disciplina ilike $1 and t.descricao_topico ilike $2';
  
  const result = await pool.query(
    sql,
    [`%${disc}%`, `%${topic}%`]  // % = wildcard (qualquer texto)
  );
  
  return result.rows;
}

async function buscarPorTopico(id) {
  const result = await pool.query(
    'SELECT enunciado FROM questoes WHERE topicoid = $1',
    [id]
  );
  return result.rows;
}

async function criar(dados) {
  const { disciplina, professor, descricao_topico } = dados;

  const sql = `
    INSERT INTO topicos (disciplina, professor, descricao_topico)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [disciplina, professor, descricao_topico]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { disciplina, professor, descricao_topico } = dados;
  
  const sql = `
    UPDATE topicos
    SET disciplina = $1, professor = $2, descricao_topico = $3
    WHERE idt = $4
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [disciplina, professor, descricao_topico, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM topicos WHERE idt = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  listarPorView,
  buscarPorId,
  buscarPorTopico,
  listarPorDisciplina,
  topicoDisciplina,
  criar,
  atualizar,
  deletar
};
