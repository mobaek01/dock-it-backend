CREATE DATABASE calendrit;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(400),
    completed BOOLEAN,
    todo_date DATE,
    user_id INTEGER REFERENCES users(user_id)
);
