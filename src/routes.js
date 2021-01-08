const express = require('express')
const routes = express.Router()

// Importando os controllers
const UsersController = require('./controllers/UsersController')
const LoginController = require('./controllers/LoginController')

// Rotas relacionadas a usuário
routes.get('/users', UsersController.Index)
routes.get('/users/:email', UsersController.Show)
routes.post('/users', UsersController.Create)
routes.put('/users/:email', UsersController.Update)
routes.delete('/users/:email', UsersController.Delete)

//Rotas relacionadas a Login
routes.post('/login', LoginController.Login)

module.exports = routes