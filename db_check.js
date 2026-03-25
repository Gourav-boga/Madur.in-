
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function check() {
  console.log('Testing connection to:', process.env.DB_HOST);
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectTimeout: 5000
    });
    console.log('SUCCESS: Connected to MySQL');
    await conn.end();
  } catch (e) {
    console.log('FAILURE: Could not connect to MySQL');
    console.log('Error:', e.message);
  }
}
check();
