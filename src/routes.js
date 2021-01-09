const express = require('express')
const routes = express.Router()

// Importando os controllers
const UsersController = require('./controllers/UsersController')
const LoginController = require('./controllers/LoginController')

// Rotas relacionadas a usuário

//Retorna todos os usuários
routes.get('/users', UsersController.Index)
//Retorna determinado usuário por email
routes.get('/users/:email', UsersController.Show)
//Cria um usuário
routes.post('/users', UsersController.Create)
//Altera as informações do usuário. {name, email, permission}
routes.put('/users/:email', UsersController.Update)
//Delete um usuário
routes.delete('/users/:email', UsersController.Delete)

//Rotas relacionadas a Login
routes.post('/login', LoginController.Login)

module.exports = routes