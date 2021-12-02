const express = require('express')
const bcrypt = require('bcrypt')
const user = express.Router()
const postgres = require('../postgres.js')

// CREATE
user.post('/', (req, res) => {
    // hashing password
    // const salt = bcrypt.genSalt(10)
    // let hashedPassword = bcrypt.hash(req.body.password, salt)
    // creating username and password
    postgres.query(`INSERT INTO users (user_name, password) VALUES ('${req.body.user_name}', '${req.body.password})`, (err, results) => {
        postgres.query('SELECT * FROM users ORDER BY user_id ASC', (err, results) => {
            res.json(results.rows)
        })
    })
})

module.exports = user;
