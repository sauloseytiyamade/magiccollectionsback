const express = require('express')
const routes = express.Router()

// Importando os controllers
const UsersController = require('./controllers/UsersController')

// Rotas relacionadas a usuário
routes.get('/users', UsersController.Index)
routes.get('/users/:email', UsersController.Show)
routes.post('/users', UsersController.Create)
routes.put('/users/:email', UsersController.Update)
routes.delete('/users/:email', UsersController.Delete)

module.exports = routes