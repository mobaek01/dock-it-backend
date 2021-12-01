const express = require('express')
const router = express.Router()
const postgres = require('../postgres.js')

// READ
router.get('/', (req, res) => {
    postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
        res.json(results.rows)
    })
})

// CREATE
router.post('/', (req, res) => {
    postgres.query(`INSERT INTO todos (title, description, todo_date, start_time, end_time) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.todo_date}', '${req.body.start_time}', '${req.body.end_time}');`, (err, results) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC', (err, results) => {
            res.json(results.rows)
        })
    })
})

// DELETE
router.delete('/:todo_id', (req, res) => {
    postgres.query(`DELETE FROM todos WHERE todo_id=${req.params.todo_id};`, (err, results) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
            res.json(results.rows)
        })
    })
})

// EDIT
router.put('/:todo_id', (req, res) => {
    postgres.query(`UPDATE todos SET description='${req.body.description}', todo_date='${req.body.todo_date}', status='${req.body.status}', start_time='${req.body.start_time}', end_time='${req.body.end_time}' WHERE todo_id=${req.params.todo_id}`, (err, results) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
            res.json(results)
        })
    })
})

module.exports = router;
