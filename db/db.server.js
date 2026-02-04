"use server";
import sql from "mssql";

const toMs = (v, defSec) => Number(v ?? defSec) * 1000;

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT), 
  database: process.env.DB_DATABASE,
  connectionTimeout: toMs(process.env.SQL_TIMEOUT, 30),
  requestTimeout:    toMs(process.env.SQL_REQUEST_TIMEOUT, 30),
};

let pool;
export async function connect() {
  if (pool) return pool;
  try {
    pool = await sql.connect(sqlConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}
