const db=require("./db")
const express = require('express')
const cors = require('cors')



// connectToMongo()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))




app.listen(`${port}`)