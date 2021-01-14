const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){
        
        //Exibe todos os registros da tabela
        database.select().table('cardrarity').then(rarity => {
            res.status(200).send({rarity})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cardrarity').then(rarity => {
            res.status(200).send({rarity})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        const body = req.body
        body['created_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        database.select('rarity').where({rarity: body.rarity}).table('cardrarity').then(rarity =>{
            //Verifica se existe algum registro com este nome
            if(rarity.length == 0){
                //Caso não exista cria o registro
                database.insert(body).into('cardrarity').then(rarity => {
                    res.status(201).send({message: 'rarity created', id: rarity[0]})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }else{
                //Caso exista apresenta que o registro já existe
                res.status(409).send({message: 'rarity exist'})                
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
        database.select('id').where({id}).table('cardrarity').then(rarity => {
            //Caso o id não exista
            if(rarity.length == 0){
                res.status(404).send({message: 'rarity id not exist'})
            }else{
                database.select('rarity').where({rarity: body.rarity}).table('cardrarity').then(rarity =>{
                    //Verifica se existe algum registro com este nome
                    if(rarity.length == 0){
                        //Caso não exista atualiza o registros
                        database.where({id}).update(body).table('cardrarity').then(rarity => {
                            res.status(200).send({message: 'rarity updated'})
                        }).catch(err => {
                            res.status(400).send(err)
                        })
                    }else{
                        //Caso exista apresenta que o registro já existe
                        res.status(409).send({message: 'rarity exist'})                
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
        database.select('id').where({id}).table('cardrarity').then(rarity => {
            //Caso o id não exista
            if(rarity.length == 0){
                res.status(404).send({message: 'rarity id not exist'})
            }else{
               //Caso exista deleta o registro no banco de dados utilizando o id
                database.where({id}).delete().table('cardrarity').then(rarity => {
                    res.status(200).send({message: 'rarity deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    }
}