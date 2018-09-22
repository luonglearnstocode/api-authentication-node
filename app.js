const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

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
