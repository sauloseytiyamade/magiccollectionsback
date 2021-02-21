const database = require('../utils/database')
const cryptpass = require('../utils/cryptpass')
const {v4: uuidv4} = require('uuid')
const validator = require('validator')
const querysDatabase = require('../utils/querysDatabase')
const generateWebToken = require('../utils/generateWebToken')
const { isEmpty } = require('lodash')
const sendMailer = require('../utils/sendMailer')

module.exports = {
    forgot(req, res){
        //Pega email passado pelo usuário
        const {email} = req.body
        
        //Verifica se este é um e-mail válido
        if(validator.isEmail(email)){
            //Verifica no banco se existe este e-mail
            querysDatabase.verifyEmail(email, 'users')
                .then(resp => {
                    if(isEmpty(resp)){
                        //Se não existir e-mail ele apresenta essa mensagem
                        res.status(404).send({message: 'user not found'})
                    }else{
                        //Verifica se email não se o login não é gerenciado pelo google ou facebook
                        database.select().where({email, external_login: 0}).table('users').then(resp => {
                            if(resp.length == 0){
                                res.status(404).send({message: 'external login'})
                            }else{
                                const uuid = uuidv4()
                                sendMailer.send(email, resp[0].name, uuid)
                                    .then(resp => {
                                        const dateExpiration = Math.floor(Date.now() / 1000) + 3600
                                        database.where({email}).update({forgot_pass_uuid: uuid, forgot_pass_expired: parseInt(dateExpiration)}).table('users').then(resp => {
                                            res.status(200).send({message: 'email sent'})
                                        })
                                    })
                                    .catch(err => {
                                        res.status(400).send({message: 'email not sent'})
                                    })
                            }
                        })
                        
                    }
                })
        }else{
            res.status(404).send({message: 'invalid email'})
        }
    },
    reset(req, res){
        const {hashUrl, password} = req.body

        database.select().where({forgot_pass_uuid: hashUrl}).table('users').then(resp => {
            if(resp.length == 0){
                res.status(400).send({message: 'password not changed'})
            }else{
                const dateNow = Math.floor(Date.now() / 1000)
                if(resp[0].forgot_pass_expired >= dateNow){
                    cryptpass.encript(password)
                        .then(resp => {
                            database.where({forgot_pass_uuid: hashUrl}).update({forgot_pass_uuid: null, forgot_pass_expired: null, password: resp}).table('users').then(resp => {
                                res.status(200).send({message: 'password changed'})
                            })
                        })
                }else{
                    res.status(400).send({message: 'date expired'})
                }
                
            }
        })
    }
}