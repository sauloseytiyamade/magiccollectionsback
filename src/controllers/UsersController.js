const express = require('express')
const { create } = require('lodash')
const database = require('../Utils/database')
const moment = require('moment')
const cryptpass = require('../Utils/cryptpass')

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
        database.select().where({email}).table('users').then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
        
    },

    Create(req,res){
        const body = req.body
        body['permission'] = 1
        body['created_at'] = moment().format('YYYY-MM-DD hh:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD hh:mm:ss')

        // Encripta o password utilizando bcrypt
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
    }
}