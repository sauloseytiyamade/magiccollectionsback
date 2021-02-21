const database = require('../utils/database')
const moment = require('moment')
const cryptpass = require('../utils/cryptpass')
const validator = require('validator')
const querysDatabase = require('../utils/querysDatabase')
const jwt = require('jsonwebtoken')

module.exports = {

    Index(req, res){
        database.select().table('users').then(data => {
            res.json(data)
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req,res){
        const {email} = req.params
        const token = ''
        
        // valida e-mail
        if(validator.isEmail(email)){
            database.select().where({email}).table('users').then(data => {
                if(data.length == 0){
                    res.status(200).send({message: false})
                }else{
                    if(token){
                        res.status(200).send({data})
                    }else{
                        res.status(200).send({message: true})
                    }
                }
            }).catch(err => {
                res.status(400).send(err)
            })
        }else{
            res.status(403).send({message: 'invalid email'})
        }
        
    },

    Create(req,res){
        const body = req.body
        body['permission'] = 1
        body['created_at'] = moment().format('YYYY-MM-DD hh:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD hh:mm:ss')

        // valida e-mail
        if(validator.isEmail(body.email)){
            // Encripta o password utilizando bcrypt
            cryptpass.encript(body.password)
            .then(resp =>{ 
    
                body['password'] = resp
    
                // Utiliza a função de verificar se existe usuário na base de dados
        
                querysDatabase.verifyEmail(body.email, 'users')
                    .then(resp => {
                        if(resp.length >= 1){
                            res.status(409).send({message: 'user exist'})
                        }else{
                            database.insert(body).into('users').then(data => {
                                res.status(201).send({message: 'user created', id: data[0]})
                            }).catch(err => {
                                res.status(400).send(err)
                            })
                        }
                    })
                
            })

        }else{
            res.status(404).send({message: 'invalid email'})
        }
    },

    Update(req, res){
        const body = req.body
        body['updated_at'] = moment().format('YYYY-MM-DD hh:mm:ss')
        const { email } = req.params

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        // valida e-mail
        if(validator.isEmail(email)){

            // Utiliza a função de verificar se existe usuário na base de dados
            querysDatabase.verifyEmail(email, 'users')
                .then(resp => {
                    if(resp.length == 0){
                        res.status(404).send({message: 'invalid email'})
                    }else{
                        // Grava log
                        database.select().where({email}).table('users').then(users => {
                            const objLog = {
                                user: user.mail,
                                logType: 'Update',
                                lineTableId: parseInt(users[0].id),
                                tableName: 'users',
                                lastValue: JSON.stringify(users[0]),
                                dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                            }
                            database.insert(objLog).into('logs').then(resp => console.log(resp))
                        })
                        database.where({email}).update(body).table('users').then(data => {
                            res.status(200).send({message: 'user updated'})
                        }).catch(err => {
                            res.status(400).send(err)
                        })
                    }
                })
        }else{
            res.status(404).send({message: 'invalid email'})
        }

    },

    Delete(req, res){
        const {email} = req.params

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        // valida e-mail
        if(validator.isEmail(email)){
            querysDatabase.verifyEmail(email, 'users')
            .then(resp => {
                if(resp.length == 0){
                    res.status(404).send({message: 'user not exist'})
                }else{
                    //Verifica na coleção se não existe nenhum card vinculado a este usuário
                    querysDatabase.verifyCardsPeerUser(resp[0].id)
                        .then(resp => {
                            //Se existir cards é necessário excluir os cards
                            if(resp.length >= 1){
                                //Pega todos os ids dos cards
                                resp.map(card => {
                                    //Faz a exclusão de todos os cards que estão na collection do usuário
                                    database.where({id: card.id}).delete().table('collection').then(data => {
                                        //Caso a exclusão dê certo, é necessário excluir o usuário
                                        if(data == 1){
                                                // Grava log
                                                database.select().where({email}).table('users').then(users => {
                                                    const objLog = {
                                                        user: user.mail,
                                                        logType: 'Delete',
                                                        lineTableId: parseInt(users[0].id),
                                                        tableName: 'users',
                                                        lastValue: JSON.stringify(users[0]),
                                                        dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                    database.insert(objLog).into('logs').then(resp => console.log(resp))
                                                })
                                            //Exclusão do usuário
                                            database.where({email}).delete().table('users').then(data => {
                                                res.status(200).send({message: 'user deleted'})
                                            }).catch(err => {
                                                res.status(400).send(err)
                                            })
                                        }else{
                                            //Caso a exclusão não dê certo, aparece esta mensagem
                                            res.status(404).send({message: 'not exclude cards'})
                                        }
                                    }).catch(err => {
                                        res.status(400).send(err)
                                    })
                                })
                            }else{
                                // Grava log
                                database.select().where({email}).table('users').then(users => {
                                    const objLog = {
                                        user: user.mail,
                                        logType: 'Delete',
                                        lineTableId: parseInt(users[0].id),
                                        tableName: 'users',
                                        lastValue: JSON.stringify(users[0]),
                                        dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                                    }
                                    database.insert(objLog).into('logs').then(resp => console.log(resp))
                                })
                                //Caso não haja nenhum card é só excluir o usuário vinculado
                                database.where({email}).delete().table('users').then(data => {
                                    res.status(200).send({message: 'user deleted'})
                                }).catch(err => {
                                    res.status(400).send(err)
                                })
                            }
                        })
                }
            })
        }else{
            res.json({message: 'invalid email'})
        }
    }
}