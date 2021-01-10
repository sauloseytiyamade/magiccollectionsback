const express = require('express')
const routes = express.Router()

// Importando os controllers
const UsersController = require('./controllers/UsersController')
const LoginController = require('./controllers/LoginController')
const CardColorController = require('./controllers/CardColorController')
const CardEditionController = require('./controllers/CardEdtionController')
const CardLanguageController = require('./controllers/CardLanguageController')
const CardQualityController = require('./controllers/CardQualityController')
const CardRarityController = require('./controllers/CardRarityController')
const CardTypeController = require('./controllers/CardTypeController')

// Rotas relacionadas a tabela usuários

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

//Rotas relacinadas a tabela cardColors

//Retorna todos os cardColors
routes.get('/cardcolor', CardColorController.Index)
//Retorna determinado cardColor
routes.get('/cardcolor/:id', CardColorController.Show)
//Cria um cardColor
routes.post('/cardcolor', CardColorController.Create)
//Altera um cardColor
routes.put('/cardcolor/:id', CardColorController.Update)
//Deleta um cardColor
routes.delete('/cardcolor/:id', CardColorController.Delete)

//Rotas relacinadas a tabela cardEdition

//Retorna todos os cardColors
routes.get('/cardedition', CardEditionController.Index)
//Retorna determinado cardColor
routes.get('/cardedition/:id', CardEditionController.Show)
//Cria um cardColor
routes.post('/cardedition', CardEditionController.Create)
//Altera um cardColor
routes.put('/cardedition/:id', CardEditionController.Update)
//Deleta um cardColor
routes.delete('/cardedition/:id', CardEditionController.Delete)

//Retorna todos os cardLanguage
routes.get('/cardlanguage', CardLanguageController.Index)
//Retorna determinado cardLanguage
routes.get('/cardlanguage/:id', CardLanguageController.Show)
//Cria um cardLanguage
routes.post('/cardlanguage', CardLanguageController.Create)
//Altera um cardLanguage
routes.put('/cardlanguage/:id', CardLanguageController.Update)
//Deleta um cardLanguage
routes.delete('/cardlanguage/:id', CardLanguageController.Delete)


//Retorna todos os cardQuality
routes.get('/cardquality', CardQualityController.Index)
//Retorna determinado cardQuality
routes.get('/cardquality/:id', CardQualityController.Show)
//Cria um cardQuality
routes.post('/cardquality', CardQualityController.Create)
//Altera um cardQuality
routes.put('/cardquality/:id', CardQualityController.Update)
//Deleta um cardQuality
routes.delete('/cardquality/:id', CardQualityController.Delete)


//Retorna todos os cardRarity
routes.get('/cardrarity', CardRarityController.Index)
//Retorna determinado cardRarity
routes.get('/cardrarity/:id', CardRarityController.Show)
//Cria um cardRarity
routes.post('/cardrarity', CardRarityController.Create)
//Altera um cardRarity
routes.put('/cardrarity/:id', CardRarityController.Update)
//Deleta um cardRarity
routes.delete('/cardrarity/:id', CardRarityController.Delete)

//Retorna todos os cardType
routes.get('/cardtype', CardTypeController.Index)
//Retorna determinado cardType
routes.get('/cardtype/:id', CardTypeController.Show)
//Cria um cardType
routes.post('/cardtype', CardTypeController.Create)
//Altera um cardType
routes.put('/cardtype/:id', CardTypeController.Update)
//Deleta um cardType
routes.delete('/cardtype/:id', CardTypeController.Delete)


module.exports = routes