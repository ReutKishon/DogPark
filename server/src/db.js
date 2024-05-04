// db.js

import { createConnection } from 'mysql2';

const connection = createConnection({
    host: 'dogparkappdatabase.c50awc66wvz9.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '~-#[#xCSRGkOO78Yg4D6)lJ4-+Qd',
    database: 'dogParkDatabase'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    createTables(); // Call the function to create tables after connecting
});

function createTables() {
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    const createDogsTable = `CREATE TABLE IF NOT EXISTS dogs (
        dog_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        age INT,
        breed VARCHAR(50),
        gender ENUM('Male', 'Female'),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`;

    const createParksTable = `CREATE TABLE IF NOT EXISTS parks (
        park_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(255),
        capacity INT,
        description TEXT
    )`;

    connection.query(createUsersTable, (err) => {
        if (err) throw err;
        console.log('Users table created successfully');
    });

    connection.query(createDogsTable, (err) => {
        if (err) throw err;
        console.log('Dogs table created successfully');
    });

    connection.query(createParksTable, (err) => {
        if (err) throw err;
        console.log('Parks table created successfully');
    });
}

export default connection;
