const database = require('../utils/database')
const moment = require('moment')
const jwt = require('jsonwebtoken')

module.exports = {
    Index(req, res){
        
        //Exibe todos os registros da tabela
        database.select().table('cardtype').then(type => {
            res.status(200).send({type})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cardtype').then(type => {
            res.status(200).send({type})
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

        //Verifica se tem permissão de administrador
        if(user.permission == 0){
            database.select('type').where({type: body.type}).table('cardtype').then(type =>{
                //Verifica se existe algum registro com este nome
                if(type.length == 0){
                    //Caso não exista cria o registro
                    database.insert(body).into('cardtype').then(type => {
                        res.status(201).send({message: 'type created', id: type[0]})
                    }).catch(err => {
                        res.status(400).send(err)
                    })
                }else{
                    //Caso exista apresenta que o registro já existe
                    res.status(409).send({message: 'type exist'})                
                }
            }).catch(err => {
                res.status(400).send(err)
            })
        }else{
            //Caso não tenha permissão de adminsitrador é enviada a mensagem de não autorizado
            res.status(401).send({message: 'Unauthorized'})
        }
    },

    Update(req, res){
        const {id} = req.params
        const body = req.body
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        //Verifica se tem permissão de administrador
        if(user.permission == 0){
            //Verifica se o id no banco de dados existe
            database.select('id').where({id}).table('cardtype').then(type => {
                //Caso o id não exista
                if(type.length == 0){
                    res.status(404).send({message: 'type id not exist'})
                }else{
                    database.select('type').where({type: body.type}).table('cardtype').then(type =>{
                        //Verifica se existe algum registro com este nome
                        if(type.length == 0){
                            //Caso não exista atualiza o registros
                            database.where({id}).update(body).table('cardtype').then(type => {
                                res.status(200).send({message: 'type updated'})
                            }).catch(err => {
                                res.status(400).send(err)
                            })
                        }else{
                            //Caso exista apresenta que o registro já existe
                            res.status(409).send({message: 'type exist'})                
                        }
                    }).catch(err => {
                        res.status(400).send(err)
                    })
                }
            })
        }else{
            //Caso não tenha permissão de adminsitrador é enviada a mensagem de não autorizado
            res.status(401).send({message: 'Unauthorized'})
        }        
        
    },

    Delete(req, res){
        const {id} = req.params

        const authorizationCode = req.headers.authorization
        const token = authorizationCode.split(' ')[1]
        const user = jwt.decode(token)

        //Verifica se tem permissão de administrador
        if(user.permission == 0){
             //Verifica se o id no banco de dados existe
            database.select('id').where({id}).table('cardtype').then(type => {
                //Caso o id não exista
                if(type.length == 0){
                    res.status(404).send({message: 'type id not exist'})
                }else{
                //Caso exista deleta o registro no banco de dados utilizando o id
                    database.where({id}).delete().table('cardtype').then(type => {
                        res.status(200).send({message: 'type deleted'})
                    }).catch(err => {
                        res.status(400).send(err)
                    })
                }
            })
        }else{
            //Caso não tenha permissão de adminsitrador é enviada a mensagem de não autorizado
            res.status(401).send({message: 'Unauthorized'})
        }
    }
}