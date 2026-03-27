const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const app = require('../index');

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sajhagig_test',
      waitForConnections: true,
      connectionLimit: 5,
      multipleStatements: true,
    });
  }
  return pool;
}

async function setupTestDB() {
  const db = await getPool();

  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  const seedPath = path.join(__dirname, '..', 'db', 'seed.sql');

  const schema = fs.readFileSync(schemaPath, 'utf8');
  const seed = fs.readFileSync(seedPath, 'utf8');

  // Drop all tables and recreate
  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  const [tables] = await db.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()"
  );
  for (const row of tables) {
    await db.query(`DROP TABLE IF EXISTS \`${row.TABLE_NAME || row.table_name}\``);
  }
  await db.query('SET FOREIGN_KEY_CHECKS = 1');

  // Run schema
  const stmts = schema.split(';').filter((s) => s.trim());
  for (const stmt of stmts) {
    await db.query(stmt);
  }

  // Run seed
  const seedStmts = seed.split(';').filter((s) => s.trim());
  for (const stmt of seedStmts) {
    await db.query(stmt);
  }
}

async function teardownTestDB() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = { app, getPool, setupTestDB, teardownTestDB };
