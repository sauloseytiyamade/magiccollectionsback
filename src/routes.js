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
const cardsController = require('./controllers/cardsController')

// Rotas relacionadas a tabela usuários

//Retorna todos os usuários
routes.get('/users', usersController.Index)
//Retorna determinado usuário por email
routes.get('/users/:email', usersController.Show)
//Cria um usuário
routes.post('/users', usersController.Create)
//Altera as informações do usuário. {name, email, permission}
routes.put('/users/:email', usersController.Update)
//Delete um usuário
routes.delete('/users/:email', usersController.Delete)

//Rotas relacionadas a Login
routes.post('/login', loginController.Login)

//Rotas relacinadas a tabela cardColors

//Retorna todos os cardColors
routes.get('/cardcolor', cardColorController.Index)
//Retorna determinado cardColor
routes.get('/cardcolor/:id', cardColorController.Show)
//Cria um cardColor
routes.post('/cardcolor', cardColorController.Create)
//Altera um cardColor
routes.put('/cardcolor/:id', cardColorController.Update)
//Deleta um cardColor
routes.delete('/cardcolor/:id', cardColorController.Delete)

//Rotas relacinadas a tabela cardEdition

//Retorna todos os cardColors
routes.get('/cardedition', cardEditionController.Index)
//Retorna determinado cardColor
routes.get('/cardedition/:id', cardEditionController.Show)
//Cria um cardColor
routes.post('/cardedition', cardEditionController.Create)
//Altera um cardColor
routes.put('/cardedition/:id', cardEditionController.Update)
//Deleta um cardColor
routes.delete('/cardedition/:id', cardEditionController.Delete)

//Retorna todos os cardLanguage
routes.get('/cardlanguage', cardLanguageController.Index)
//Retorna determinado cardLanguage
routes.get('/cardlanguage/:id', cardLanguageController.Show)
//Cria um cardLanguage
routes.post('/cardlanguage', cardLanguageController.Create)
//Altera um cardLanguage
routes.put('/cardlanguage/:id', cardLanguageController.Update)
//Deleta um cardLanguage
routes.delete('/cardlanguage/:id', cardLanguageController.Delete)


//Retorna todos os cardQuality
routes.get('/cardquality', cardQualityController.Index)
//Retorna determinado cardQuality
routes.get('/cardquality/:id', cardQualityController.Show)
//Cria um cardQuality
routes.post('/cardquality', cardQualityController.Create)
//Altera um cardQuality
routes.put('/cardquality/:id', cardQualityController.Update)
//Deleta um cardQuality
routes.delete('/cardquality/:id', cardQualityController.Delete)


//Retorna todos os cardRarity
routes.get('/cardrarity', cardRarityController.Index)
//Retorna determinado cardRarity
routes.get('/cardrarity/:id', cardRarityController.Show)
//Cria um cardRarity
routes.post('/cardrarity', cardRarityController.Create)
//Altera um cardRarity
routes.put('/cardrarity/:id', cardRarityController.Update)
//Deleta um cardRarity
routes.delete('/cardrarity/:id', cardRarityController.Delete)

//Retorna todos os cardType
routes.get('/cardtype', cardTypeController.Index)
//Retorna determinado cardType
routes.get('/cardtype/:id', cardTypeController.Show)
//Cria um cardType
routes.post('/cardtype', cardTypeController.Create)
//Altera um cardType
routes.put('/cardtype/:id', cardTypeController.Update)
//Deleta um cardType
routes.delete('/cardtype/:id', cardTypeController.Delete)

//Retorna todos os cards
routes.get('/cards', cardsController.Index)
//Retorna determinado cards
routes.get('/cards/:id', cardsController.Show)
//Cria um cards
routes.post('/cards', cardsController.Create)
//Altera um cards
routes.put('/cards/:id', cardsController.Update)
//Deleta um cards
routes.delete('/cards/:id', cardsController.Delete)


module.exports = routes