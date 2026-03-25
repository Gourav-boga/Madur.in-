import mysql from 'mysql2/promise';

// Connection pool for maximum performance and efficiency
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Hostinger often uses standard settings, but SSL might be needed in some cases
  // ssl: { rejectUnauthorized: false } 
});

/**
 * Executes a MySQL query and returns the results.
 * @param sql The SQL query string
 * @param params Optional parameters for prepared statements
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T[];
  } catch (error) {
    console.error('MySQL Query Error:', {
      sql,
      params,
      error: error instanceof Error ? error.message : error
    });
    throw error;
  }
}

/**
 * Shorthand for simple SELECT * FROM table
 */
export async function getAll<T = any>(table: string): Promise<T[]> {
  return query<T>(`SELECT * FROM ?? ORDER BY created_at DESC`, [table]);
}

/**
 * Shorthand for selecting a single record by field
 */
export async function getOne<T = any>(table: string, field: string, value: any): Promise<T | null> {
  const results = await query<T>(`SELECT * FROM ?? WHERE ?? = ? LIMIT 1`, [table, field, value]);
  return results.length > 0 ? results[0] : null;
}

/**
 * Inserts a record into a table
 */
export async function insert(table: string, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const sql = `INSERT INTO ?? (${keys.map(() => '??').join(', ')}) VALUES (${placeholders})`;
  const params = [table, ...keys, ...values];
  
  return query(sql, params);
}

/**
 * Updates a record in a table
 */
export async function update(table: string, data: Record<string, any>, idField: string, idValue: any) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map(key => `?? = ?`).join(', ');
  
  const sql = `UPDATE ?? SET ${setClause} WHERE ?? = ?`;
  const params = [table, ...keys.flatMap((k, i) => [k, values[i]]), idField, idValue];
  
  return query(sql, params);
}

/**
 * Deletes a record from a table
 */
export async function remove(table: string, idField: string, idValue: any) {
  return query(`DELETE FROM ?? WHERE ?? = ?`, [table, idField, idValue]);
}

export default {
  query,
  getAll,
  getOne,
  insert,
  update,
  remove
};
