const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){        
        //Exibe todos os registros da tabela
        database.select().table('cards').then(card => {
            res.status(200).send({card})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cards').then(card => {
            res.status(200).send({card})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        const {cardName,cardEdition_id} = req.body
        const body = req. body
        body['created_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')


        database.select('cardName').where({cardName}).table('cards').then(card => {
            //Verifica se existe algum registro com este nome
            if(card.length >= 1){
                //Verifica se existe algum registro com esta edição
                database.select('cardEdition_id').where({cardEdition_id}).table('cards').then(card => {
                    //Caso exista apresenta o erro
                    res.status(409).send({message: 'card exist'})
                })
            }else{
                //Caso não exista cria o registro
                database.insert(body).into('cards').then(card => {
                    res.status(201).send({message: 'card created', id: card[0]})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    },

    Update(req, res){
        const {id} = req.params
        const body = req.body
        const {cardName,cardEdition_id} = req.body
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('cards').then(card => {
            //Caso o id não exista
            if(card.length == 0){
                res.status(404).send({message: 'card not exist'})
            }else{
                database.select('cardName').where({cardName}).table('cards').then(card => {
                    //Verifica se existe algum registro com este nome
                    if(card.length >= 1){
                        //Verifica se existe algum registro com esta edição
                        database.select('cardEdition_id').where({cardEdition_id}).table('cards').then(card => {
                            //Caso exista apresenta o erro
                            res.status(409).send({message: 'card exist'})
                        })
                    }else{
                        //Caso o id exista atualiza o registro no banco de dados utilizando o id
                        database.where({id}).update(body).table('cards').then(card => {
                            res.status(200).send({message: 'card updated'})
                        }).catch(err => {
                            res.status(400).send(err)
                        }) 
                    }
                })
            }
        })
        
    },

    Delete(req, res){
        const {id} = req.params
        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('cards').then(cards => {
            //Caso o id não exista
            if(cards.length == 0){
                res.status(404).send({message: 'cards id not exist'})
            }else{
               //Caso exista deleta o registro no banco de dados utilizando o id
                database.where({id}).delete().table('cards').then(cards => {
                    res.status(200).send({message: 'cards deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    }
}