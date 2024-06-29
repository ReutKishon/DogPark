CREATE TABLE IF NOT EXISTS follows (
    owner_id VARCHAR(100),
    dog_id INT,
    FOREIGN KEY (owner_id) REFERENCES users (user_id),
    FOREIGN KEY (dog_id) REFERENCES dogs (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (owner_id, dog_id)
);