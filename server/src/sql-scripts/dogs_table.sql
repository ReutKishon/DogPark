CREATE TABLE IF NOT EXISTS dogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    age DOUBLE,
    gender Enum('Male', 'Female'),
    imageName VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    current_parkId VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);