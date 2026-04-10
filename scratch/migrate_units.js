const mysql = require('./src/lib/mysql').default;
require('dotenv').config();

async function migrate() {
  try {
    const results = await mysql.query(
      "UPDATE products SET unit = '1 kg' WHERE unit = '1000grms'"
    );
    console.log(`Successfully updated ${results.affectedRows} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
