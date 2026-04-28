import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

async function testConnection() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Direct PG Connection Success:", res.rows[0]);
  } catch (e) {
    console.error("Direct PG Connection Error:", e);
  } finally {
    await pool.end();
  }
}

testConnection();
