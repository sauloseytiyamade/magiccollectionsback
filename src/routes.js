const express = require('express')
const routes = express.Router()

// Importando os controllers
const usersController = require('./controllers/usersController')
const loginController = require('./controllers/loginController')
const cardColorController = require('./controllers/cardColorController')
const cardEditionController = require('./controllers/cardEdtionController')
const cardLanguageController = require('./controllers/cardLanguageController')
const cardQualityController = require('./controllers/cardQualityController')
const cardRarityController = require('./controllers/cardRarityController')
const cardTypeController = require('./controllers/cardTypeController')
const cardController = require('./controllers/cardController')
const collectionController = require('./controllers/collectionController')
const Authorization = require('./middlewares/auth')

// Rotas relacionadas a tabela usuários

//Retorna todos os usuários
routes.get('/users',Authorization, usersController.Index)
//Retorna determinado usuário por email
routes.get('/users/:email', usersController.Show)
//Cria um usuário
routes.post('/users', usersController.Create)
//Altera as informações do usuário. {name, email, permission}
routes.put('/users/:email',Authorization, usersController.Update)
//Delete um usuário
routes.delete('/users/:email',Authorization, usersController.Delete)

//Rotas relacionadas a Login
routes.post('/login', loginController.Login)

//Rotas relacinadas a tabela cardColors

//Retorna todos os cardColors
routes.get('/cardcolors', Authorization, cardColorController.Index)
//Retorna determinado cardColor
routes.get('/cardcolors/:id', Authorization, cardColorController.Show)
//Cria um cardColor
routes.post('/cardcolors', Authorization, cardColorController.Create)
//Altera um cardColor
routes.put('/cardcolors/:id', Authorization, cardColorController.Update)
//Deleta um cardColor
routes.delete('/cardcolors/:id', Authorization, cardColorController.Delete)

//Rotas relacinadas a tabela cardEdition

//Retorna todos os cardeditions
routes.get('/cardeditions', Authorization, cardEditionController.Index)
//Retorna determinado cardeditions
routes.get('/cardeditions/:id', Authorization, cardEditionController.Show)
//Cria um cardeditions
routes.post('/cardeditions', Authorization, cardEditionController.Create)
//Altera um cardeditions
routes.put('/cardeditions/:id', Authorization, cardEditionController.Update)
//Deleta um cardeditions
routes.delete('/cardeditions/:id', Authorization, cardEditionController.Delete)

//Retorna todos os cardLanguages
routes.get('/cardlanguages', Authorization, cardLanguageController.Index)
//Retorna determinado cardLanguages
routes.get('/cardlanguages/:id', Authorization, cardLanguageController.Show)
//Cria um cardLanguages
routes.post('/cardlanguages', Authorization, cardLanguageController.Create)
//Altera um cardLanguages
routes.put('/cardlanguages/:id', Authorization, cardLanguageController.Update)
//Deleta um cardLanguages
routes.delete('/cardlanguages/:id', Authorization, cardLanguageController.Delete)


//Retorna todos os cardQualities
routes.get('/cardqualities', cardQualityController.Index)
//Retorna determinado cardQualities
routes.get('/cardqualities/:id', cardQualityController.Show)
//Cria um cardQualities
routes.post('/cardqualities', cardQualityController.Create)
//Altera um cardQualities
routes.put('/cardqualities/:id', cardQualityController.Update)
//Deleta um cardQualities
routes.delete('/cardqualities/:id', cardQualityController.Delete)


//Retorna todos os cardRarities
routes.get('/cardrarities', cardRarityController.Index)
//Retorna determinado cardRarities
routes.get('/cardrarities/:id', cardRarityController.Show)
//Cria um cardRarities
routes.post('/cardrarities', cardRarityController.Create)
//Altera um cardRarities
routes.put('/cardrarities/:id', cardRarityController.Update)
//Deleta um cardRarities
routes.delete('/cardrarities/:id', cardRarityController.Delete)

//Retorna todos os cardTypes
routes.get('/cardtypes', cardTypeController.Index)
//Retorna determinado cardTypes
routes.get('/cardtypes/:id', cardTypeController.Show)
//Cria um cardTypes
routes.post('/cardtypes', cardTypeController.Create)
//Altera um cardTypes
routes.put('/cardtypes/:id', cardTypeController.Update)
//Deleta um cardTypes
routes.delete('/cardtypes/:id', cardTypeController.Delete)

//Retorna todos os cards
routes.get('/cards', cardController.Index)
//Retorna determinado cards
routes.get('/cards/:id', cardController.Show)
//Cria um cards
routes.post('/cards', cardController.Create)
//Altera um cards
routes.put('/cards/:id', cardController.Update)
//Deleta um cards
routes.delete('/cards/:id', cardController.Delete)

//Retorna todos os cards
routes.get('/cards', cardController.Index)
//Retorna determinado cards
routes.get('/cards/:id', cardController.Show)
//Cria um cards
routes.post('/cards', cardController.Create)
//Altera um cards
routes.put('/cards/:id', cardController.Update)
//Deleta um cards
routes.delete('/cards/:id', cardController.Delete)

//Retorna todos os cards da coleção
routes.get('/collections', collectionController.Index)
//Retorna determinado card da coleção
routes.get('/collections/:id', collectionController.Show)
//Cria um cards na coleção
routes.post('/collections', collectionController.Create)
//Altera um cards na coleção
routes.put('/collections/:id', collectionController.Update)
//Deleta um cards na coleção
routes.delete('/collections/:id', collectionController.Delete)


module.exports = routes