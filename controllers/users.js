const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const postgres = require('../postgres.js')

// CREATE
router.post('/', (req, res) => {
    postgres.query(`INSERT INTO users (user_name, password) VALUES ('${req.body.description}', ${req.body.completed}, ${req.body.current_timestamp}, ${req.body.user_id});`, (err, createdTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY id ASC', (err, allTodos) => {
            res.json(allTodos)
        })
    })
})
