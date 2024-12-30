import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function criarEPopularTabelaUsuarios(nome, sobrenome, password) {
  try {
    // Abrindo a conexão com o banco de dados
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });

    // Criando a tabela, se não existir
    await db.exec(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        sobrenome TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);

    console.log('Tabela criada ou já existente.');

    // Inserindo um registro na tabela
    await db.run(
      `INSERT INTO usuarios (nome, sobrenome, password) VALUES (?, ?, ?)`,
      nome,
      sobrenome,
      password
    );

    console.log('Usuário inserido com sucesso.');

    // Fechando a conexão
    await db.close();
    console.log('Conexão com o banco de dados encerrada.');
  } catch (error) {
    console.error('Erro ao criar tabela ou popular:', error.message);
  }
}

// Chamando a função com exemplo de dados
criarEPopularTabelaUsuarios('Gerson', 'Santos', 'Gababa1234');

