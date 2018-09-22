const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// connect to database
const env = app.get('env')
const config = require('./config')[env]
const uri = `mongodb://${config.database.user}:${config.database.pass}@${config.database.host}:${config.database.port}/${config.database.db}`
mongoose.connect(uri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

// ================================================
// Middleware
// ================================================
app.use(morgan('dev'))
app.use(bodyParser.json())

// ================================================
// Routes
// ================================================
app.get('/', (req, res) => res.send('Hello World!!!'))

app.use('/users', require('./routes/users'))

// start the server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
