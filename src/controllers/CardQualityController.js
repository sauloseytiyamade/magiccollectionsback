const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){
        
        //Exibe todos os registros da tabela
        database.select().table('cardquality').then(quality => {
            res.status(200).send({quality})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cardquality').then(quality => {
            res.status(200).send({quality})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        const body = req.body
        body['created_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        database.select('quality').where({quality: body.quality}).table('cardquality').then(quality =>{
            //Verifica se existe algum registro com este nome
            if(quality.length == 0){
                //Caso não exista cria o registro
                database.insert(body).into('cardquality').then(quality => {
                    res.status(201).send({message: 'quality created', id: quality[0]})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }else{
                //Caso exista apresenta que o registro já existe
                res.status(409).send({message: 'quality exist'})                
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
        database.select('id').where({id}).table('cardquality').then(quality => {
            //Caso o id não exista
            if(quality.length == 0){
                res.status(404).send({message: 'quality id not exist'})
            }else{
                database.select('quality').where({quality: body.quality}).table('cardquality').then(quality =>{
                    //Verifica se existe algum registro com este nome
                    if(quality.length == 0){
                        //Caso não exista atualiza o registros
                        database.where({id}).update(body).table('cardquality').then(quality => {
                            res.status(200).send({message: 'quality updated'})
                        }).catch(err => {
                            res.status(400).send(err)
                        })
                    }else{
                        //Caso exista apresenta que o registro já existe
                        res.status(409).send({message: 'quality exist'})                
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
        database.select('id').where({id}).table('cardquality').then(quality => {
            //Caso o id não exista
            if(quality.length == 0){
                res.status(404).send({message: 'quality id not exist'})
            }else{
               //Caso exista deleta o registro no banco de dados utilizando o id
                database.where({id}).delete().table('cardquality').then(quality => {
                    res.status(200).send({message: 'quality deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    }
}