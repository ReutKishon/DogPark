// db.js

import { createConnection } from "mysql2";

const connection = createConnection({
  host: "dogparkappdatabase.c50awc66wvz9.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "P*<mgnU#%no2Cj3XfW-kVRFRtDFM",
  database: "dogParkDatabase",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
  createTables(); // Call the function to create tables after connecting
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

  connection.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log("Users table created successfully");
  });

  connection.query(createDogsTable, (err) => {
    if (err) throw err;
    console.log("Dogs table created successfully");
  });
}

export default connection;
