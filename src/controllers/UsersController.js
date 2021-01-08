const express = require('express')
const { create } = require('lodash')
const database = require('../Utils/database')
const moment = require('moment')
const cryptpass = require('../Utils/cryptpass')
const validator = require('validator')

const verifyEmail = async (email) => {
    const result = await database.select('email').where({email}).table('users')
    return result
}

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
        
                verifyEmail(body.email)
                    .then(resp => {
                        if(resp.length >= 1){
                            res.json({message: 'user exist'})
                        }else{
                            database.insert(body).into('users').then(data => {
                                res.json(data)
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
            verifyEmail(email)
                .then(resp => {
                    if(resp.length == 0){
                        res.json({message: 'user not exist'})
                    }else{
                        database.where({email}).update(body).table('users').then(data => {
                            res.json(data)
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
            verifyEmail(email)
            .then(resp => {
                if(resp.length == 0){
                    res.json({message: 'user not exist'})
                }else{
                    database.where({email}).delete().table('users').then(data => {
                        res.json(data)
                    }).catch(err => {
                        res.json(err)
                    })
                }
            })
        }else{
            res.json({message: 'invalid email'})
        }
    }
}