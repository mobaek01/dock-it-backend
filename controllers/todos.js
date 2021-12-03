const express = require('express')
const router = express.Router()
const postgres = require('../postgres.js')
const bcrypt = require('bcrypt')

///////////////////////////////////////// USERS ///////////////////////////////////////

// hashing password

// creating username and password
// router.post('/userCreate', (req, res) => {
//     let hashedPassword = bcrypt.hash(req.body.password, bcrypt.genSalt(10))
//     postgres.query(`INSERT INTO users (user_name, password) VALUES ('${req.body.user_name}', '${hashedPassword}')`, (err, results) => {
//         postgres.query('SELECT * FROM users ORDER BY user_id ASC', (err, results) => {
//             res.json(results.rows)
//         })
//     })
// })

// CREATE USERS
// followed documentation: https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
router.post('/userCreate', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            postgres.query(`INSERT INTO users (user_name, password) VALUES ('${req.body.user_name}', '${hash}')`, (err, results) => {
                postgres.query('SELECT * FROM users ORDER BY user_id ASC', (err, results) => {
                    res.json(results.rows)
                })
            })
        })
    })
})

// LOGIN
// GRAVEYARD
// postgres.query(`SELECT password FROM users WHERE user_name='${foundUser.rows[0].user_name}'`, (err, foundPassword) => {
//     bcrypt.compare(req.body.password, foundPassword.rows[0].password, (err, results) => {
//         if(err){
//             console.log('Password does not match');
//         } else {
//             postgres.query(`SELECT * FROM users WHERE user_name=${foundUser};`, (err, results) => {
//                 res.json(results.rows)
//                 console.log(results.rows);
//             })
//             console.log('Success');
//         }
//     })
// })
// followed documentation: https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
router.put('/login', (req, res) => {
    postgres.query(`SELECT * FROM users WHERE user_name='${req.body.user_name}';`, (err, foundUser) => {
        if(err) {
            console.log('Server ran into an error');
        } else {
            if (foundUser.rows.length === 0){
                console.log('User does not exist');
                res.json({error:'User does not exist, please try again'});
            } else {
                bcrypt.compare(req.body.password, foundUser.rows[0].password, (err, passwordMatched) => {
                    if (err) {
                        console.log('Server ran into an error');
                    } else {
                        if (!passwordMatched) {
                            console.log('Password is incorrect');
                            res.json({error:'Password is incorrect, please try again'});
                        } else {
                            console.log('Success');
                            res.json(foundUser.rows);
                        }
                    }
                })
            }
        }
    })
})

// router.post('/login',(req, res) => {
//     //USERNAME CHECK
//     const {user_name, password} = req.body
//     const users = postgres.query('SELECT * FROM users WHERE user_name = $1', [user_name])
//     if(users.rows.length === 0) return res.status(401).json({error : "Email is incorrect"})
//     //PASSWORD CHECK
//     const validPassword = bcrypt.compare(password, users.rows[0].password)
//     if(!validPassword) return res.status(401).json({error : "Incorrect password"})
//     return res.status(200).json("Success")
// })

// FIND USERS
router.get('/userCreate', (req, res) => {
    postgres.query('SELECT * FROM users ORDER BY user_id ASC;', (err, results) => {
        res.json(results.rows)
    })
})


//////////////////////////////////////// TODOS ////////////////////////////////////////
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
    postgres.query(`UPDATE todos SET title='${req.body.title}',
    description='${req.body.description}', todo_date='${req.body.todo_date}',  start_time='${req.body.start_time}', end_time='${req.body.end_time}' WHERE todo_id=${req.params.todo_id}`, (err, results) => {
        postgres.query('SELECT * FROM todos ORDER BY todo_id ASC;', (err, results) => {
            res.json(results)
        })
    })
})

module.exports = router;
