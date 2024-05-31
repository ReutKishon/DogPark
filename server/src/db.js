// db.js
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

import { createConnection } from "mysql2";
const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
  createTables();
});

function createTables() {
  const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const createDogsTable = `CREATE TABLE IF NOT EXISTS dogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        name VARCHAR(50) NOT NULL,
        age INT,
        lifeStage ENUM('Adult', 'Puppy'),
        gender ENUM('Male', 'Female'),
        current_parkId VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`;

  const createFollowTable = `CREATE TABLE IF NOT EXISTS follows (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      dog_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (dog_id) REFERENCES dogs(id),
      UNIQUE (user_id, dog_id)
    );
    `;

  connection.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log("Users table created successfully");
  });

  connection.query(createDogsTable, (err) => {
    if (err) throw err;
    console.log("Dogs table created successfully");
  });
  connection.query(createFollowTable, (err) => {
    if (err) throw err;
    console.log("Dogs table created successfully");
  });
}

export default connection;
