const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const env = require('../config/env');
const { hashPassword } = require('../utils/hash');

async function run() {
  const shouldSeed = process.argv.includes('--seed') || true;

  // Connect without database first to create it if needed
  const initConn = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true,
  });

  console.log('Creating database if not exists...');
  await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${env.db.name}\``);
  await initConn.query(`USE \`${env.db.name}\``);

  // Run schema
  console.log('Running schema.sql...');
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await initConn.query(schema);
  console.log('Schema created successfully.');

  if (shouldSeed) {
    // Generate proper bcrypt hash for seed data
    console.log('Generating password hash...');
    const hash = await hashPassword('password123');

    console.log('Running seed.sql...');
    let seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    // Replace the placeholder hash with the real one
    seed = seed.replace(/\$2a\$10\$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem/g, hash);
    await initConn.query(seed);
    console.log('Seed data inserted successfully.');
  }

  await initConn.end();
  console.log('Migration complete!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
