const database = require('../utils/database')
const moment = require('moment')
const jwt = require('jsonwebtoken')

module.exports = {
    Index(req, res){
        
        //Exibe todos os registros da tabela
        database.select().table('cardedition').then(edition => {
            res.status(200).send({edition})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cardedition').then(edition => {
            res.status(200).send({edition})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        const body = req.body
        body['created_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        database.select('edition').where({edition: body.edition}).table('cardedition').then(edition =>{
            //Verifica se existe algum registro com este nome
            if(edition.length == 0){
                //Caso não exista cria o registro
                database.insert(body).into('cardedition').then(edition => {
                    //Grava log
                    const objLog = {
                        user: user.mail,
                        logType: 'Create',
                        lineTableId: parseInt(edition[0]),
                        tableName: 'cardEdition',
                        lastValue: JSON.stringify(body),
                        dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                    database.insert(objLog).into('logs').then()
                    res.status(201).send({message: 'edition created', id: edition[0]})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }else{
                //Caso exista apresenta que o registro já existe
                res.status(409).send({message: 'edition exist'})                
            }
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Update(req, res){
        const {id} = req.params
        const body = req.body
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('cardedition').then(edition => {
            //Caso o id não exista
            if(edition.length == 0){
                res.status(404).send({message: 'edition id not exist'})
            }else{
                database.select('edition').where({edition: body.edition, code:body.code}).table('cardedition').then(edition =>{
                    //Verifica se existe algum registro com este nome
                    if(edition.length == 0){
                        // Grava log
                        database.select().where({id}).table('cardedition').then(card => {
                            const objLog = {
                                user: user.mail,
                                logType: 'Update',
                                lineTableId: parseInt(card[0].id),
                                tableName: 'cardEdition',
                                lastValue: JSON.stringify(card[0]),
                                dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                            }
                            database.insert(objLog).into('logs').then()
                        })
                        //Caso não exista atualiza o registros
                        database.where({id}).update(body).table('cardedition').then(edition => {
                            res.status(200).send({message: 'edition updated'})
                        }).catch(err => {
                            res.status(400).send(err)
                        })
                    }else{
                        //Caso exista apresenta que o registro já existe
                        res.status(409).send({message: 'edition exist'})                
                    }
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
        
    },

    Delete(req, res){
        const {id} = req.params

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('cardedition').then(edition => {
            //Caso o id não exista
            if(edition.length == 0){
                res.status(404).send({message: 'edition id not exist'})
            }else{
                // Grava log
                database.select().where({id}).table('cardedition').then(card => {
                    const objLog = {
                        user: user.mail,
                        logType: 'Delete',
                        lineTableId: parseInt(card[0].id),
                        tableName: 'cardEdition',
                        lastValue: JSON.stringify(card[0]),
                        dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                    database.insert(objLog).into('logs').then()
                })
                //Caso o id exista deleta o registro no banco de dados utilizando o id
                database.where({id}).delete().table('cardedition').then(edition => {
                    res.status(200).send({message: 'edition deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    }
}