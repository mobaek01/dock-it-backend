const express = require('express')
const router = express.Router()
const postgres = require('../postgres.js')

// READ
router.get('/', (req, res) => {
    postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
        res.json(results.rows)
        console.log(results.rows);
    })
})

// CREATE
router.post('/', (req, res) => {
    postgres.query(`INSERT INTO todos (description, todo_date) VALUES ('${req.body.description}', '${req.body.todo_date}');`, (err, createdTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC', (err, results) => {
            res.json(results.rows)
        })
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM todos WHERE id=${req.params.todo_id};`, (err, deletedTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
            res.json(results.rows)
        })
    })
})

// EDIT
router.put('/:id', (req, res) => {
    postgres.query(`UPDATE todo SET description='${req.body.description}', completed=${req.body.completed}, todo_date=${req.body.todo_date} WHERE id=${req.params.todo_id}`, (err, editTodo) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
            res.json(results)
        })
    })
})

module.exports = router;
