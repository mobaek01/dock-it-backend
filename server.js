// DEPENDENCIES
const express = require('express')
const cors = require('cors')
const app = express()
const postgres = require('./postgres.js')

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// CONTROLLERS
const todoController = require('./controllers/todos.js')
app.use('/todos', todoController)

// CONNECTIONS
postgres.connect()

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening");
})
