import sql from "mssql";
import { DB_DATABASE, DB_PASSWORD, DB_SERVER, DB_USER } from "../config.js";

export const dbSettings = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_DATABASE,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    // const result = await pool.request().query("SELECT GETDATE()");
    // console.log(result)
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };
