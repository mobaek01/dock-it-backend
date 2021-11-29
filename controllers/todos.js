const express = require('express')
const router = express.Router()
const postgres = require('../postgres.js')

// READ
router.get('/', (req, res) => {
    postgres.query('SELECT * FROM todos ORDER BY id ASC;', (err, allTodos) => {
        res.json(allTodos)
    })
})

// CREATE
router.post('/', (req, res) => {
    postgres.query(`INSERT INTO todos (description, completed, todo_date) VALUES ('${req.body.description}', ${req.body.completed} ${req.body.current_timestamp});`, (err, createdTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY id ASC', (err, allTodos) => {
            res.json(allTodos)
        })
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM todos WHERE id=${req.params.todo_id};`, (err, deletedTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY id ASC;', (err, allTodos) => {
            res.json(allTodos)
        })
    })
})

// EDIT
router.put('/:id', (req, res) => {
    postgres.query(`UPDATE todo SET description='${req.body.description}', completed=${req.body.completed}, todo_date=${req.body.current_timestamp} WHERE id=${req.params.todo_id}`, (err, editTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY id ASC;', (err, allTodos) => {
            res.json(allTodos)
        })
    })
})

module.exports = router;
