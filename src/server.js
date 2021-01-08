require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.APP_PORT

// Acesso ao arquivo de rotas
const routes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// Usado para logger
app.use(morgan('combined'))

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`)
})

