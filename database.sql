CREATE DATABASE calendrit;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    todo_date DATE,
    start_time TIME,
    end_time TIME,
    user_id INTEGER
);
