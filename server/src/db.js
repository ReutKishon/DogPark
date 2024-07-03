import { createConnection } from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

// @ts-ignore
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connection = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
});

connection.connect(async (err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // Function to execute SQL scripts
  async function executeSqlScript(scriptPath) {
    const sql = fs.readFileSync(scriptPath, "utf8");
    try {
      await connection.promise().query(sql);
      console.log(`Successfully executed ${path.basename(scriptPath)}`);
    } catch (err) {
      console.error(`Error executing ${path.basename(scriptPath)}:`, err);
    }
  }

  // Directory where SQL scripts are located
  const scriptsDir = path.join(__dirname, "sql-scripts");

  // Read all SQL script files from directory
  fs.readdir(scriptsDir, (err, files) => {
    if (err) {
      console.error("Error reading SQL scripts directory:", err);
      return;
    }

    // Execute each SQL script file sequentially
    files.forEach((file) => {
      const scriptPath = path.join(scriptsDir, file);
      executeSqlScript(scriptPath);
    });
  });
});

export default connection;
