CREATE DATABASE calendrit;

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(400),
    completed BOOLEAN,
    todo_date timestamp
);

INSERT INTO todos (description, todo_date) VALUES ('ASDF', current_timestamp);
