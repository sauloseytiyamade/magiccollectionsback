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

//Chama o arquivo de rotas da aplicação
app.use(routes)

//Inicia o servidor na porta fornecida
app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})

