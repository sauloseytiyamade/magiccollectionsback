const express = require('express')
const database = require('../utils/database')
const moment = require('moment')
const cryptpass = require('../utils/cryptpass')
const validator = require('validator')
const querysDatabase = require('../utils/querysDatabase')

module.exports = {

    Index(req, res){
        database.select().table('users').then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
    },

    Show(req,res){
        const {email} = req.params
        
        // valida e-mail
        if(validator.isEmail(email)){
            database.select().where({email}).table('users').then(data => {
                res.json(data)
            }).catch(err => {
                res.json(err)
            })
        }else{
            res.json({message: 'invalid email'})
        }
        
    },

    Create(req,res){
        const body = req.body
        body['permission'] = 1
        body['created_at'] = moment().format('YYYY-MM-DD hh:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD hh:mm:ss')

        // valida e-mail
        if(validator.isEmail(body.email)){
            
            cryptpass.encript(body.password)
            .then(resp =>{ 
    
                body['password'] = resp
    
                // Utiliza a função de verificar se existe usuário na base de dados
        
                querysDatabase.verifyEmail(body.email, 'users')
                    .then(resp => {
                        if(resp.length >= 1){
                            res.json({message: 'user exist'})
                        }else{
                            database.insert(body).into('users').then(data => {
                                res.json({message: 'user created'})
                            }).catch(err => {
                                res.json(err)
                            })
                        }
                    })
                
            })

        }else{
            res.json({message: 'invalid email'})
        }

        // Encripta o password utilizando bcrypt
    },

    Update(req, res){
        const body = req.body
        const { email } = req.params

        // valida e-mail
        if(validator.isEmail(email)){

            // Utiliza a função de verificar se existe usuário na base de dados
            querysDatabase.verifyEmail(email, 'users')
                .then(resp => {
                    if(resp.length == 0){
                        res.json({message: 'user not exist'})
                    }else{
                        database.where({email}).update(body).table('users').then(data => {
                            res.json({message: 'user updated'})
                        }).catch(err => {
                            res.json(err)
                        })
                    }
                })
        }else{
            res.json({message: 'invalid email'})
        }

    },

    Delete(req, res){
        const {email} = req.params

        // valida e-mail
        if(validator.isEmail(email)){
            querysDatabase.verifyEmail(email, 'users')
            .then(resp => {
                if(resp.length == 0){
                    res.json({message: 'user not exist'})
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
                                            //Exclusão do usuário
                                            database.where({email}).delete().table('users').then(data => {
                                                res.json({message: 'user deleted'})
                                            }).catch(err => {
                                                res.json(err)
                                            })
                                        }else{
                                            //Caso a exclusão não dê certo, aparece esta mensagem
                                            res.json({message: 'not exclude cards'})
                                        }
                                    }).catch(err => {
                                        res.json(err)
                                    })
                                })
                            }else{
                                //Caso não haja nenhum card é só excluir o usuário vinculado
                                database.where({email}).delete().table('users').then(data => {
                                    res.json({message: 'user deleted'})
                                }).catch(err => {
                                    res.json(err)
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