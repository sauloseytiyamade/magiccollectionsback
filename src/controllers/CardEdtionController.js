const database = require('../utils/database')
const moment = require('moment')

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

        database.select('edition').where({edition: body.edition}).table('cardedition').then(edition =>{
            //Verifica se existe algum registro com este nome
            if(edition.length == 0){
                //Caso não exista cria o registro
                database.insert(body).into('cardedition').then(edition => {
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

        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('cardedition').then(edition => {
            //Caso o id não exista
            if(edition.length == 0){
                res.status(404).send({message: 'edition id not exist'})
            }else{
                database.select('edition').where({edition: body.edition}).table('cardedition').then(edition =>{
                    //Verifica se existe algum registro com este nome
                    if(edition.length == 0){
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

        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('cardedition').then(edition => {
            //Caso o id não exista
            if(edition.length == 0){
                res.status(404).send({message: 'edition id not exist'})
            }else{
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