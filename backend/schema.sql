CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    description TEXT,
    status VARCHAR(50) DEFAULT 'new'
);