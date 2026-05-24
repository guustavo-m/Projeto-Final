require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('./src/public/pages/home'));
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const { verificarToken } = require('./src/middleware/authMiddleware');
app.use('/auth', authRoutes);

const topicoRoutes = require('./src/routes/topicoRoutes');
app.use('/topico', topicoRoutes);

const questoesRoutes = require('./src/routes/questoesRoutes');
app.use('/questoes', questoesRoutes);

const dificuldadeRoutes = require('./src/routes/dificuldadeRoutes');
app.use('/dificuldade', dificuldadeRoutes);

const materiaRoutes = require('./src/routes/materiaRoutes');
app.use('/materia', materiaRoutes);

const respostaRoutes = require('./src/routes/respostaRoutes');
app.use('/resposta', respostaRoutes);

const usuarioRoutes = require('./src/routes/usuarioRoutes');
app.use('/usuario', usuarioRoutes);

const vestibularesRoutes = require('./src/routes/vestibularesRoutes');
app.use('/vestibulares', vestibularesRoutes);

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'pages','cadastro.html'));
});

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API do Projeto Final SESI SENAI com PostgreSQL',
    versao: '3.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL'
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});
