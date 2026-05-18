require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const topicoRoutes = require('./src/routes/topicoRoutes');
app.use('/topico', topicoRoutes);

const questoesRoutes = require('./src/routes/questoesRoutes');
app.use('/questoes', questoesRoutes);

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Matemática com PostgreSQL',
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
