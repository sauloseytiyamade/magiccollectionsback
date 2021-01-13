const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){        
        //Exibe todos os registros da tabela
        database.select().table('cards').then(cards => {
            res.status(200).send({cards})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cards').then(cards => {
            res.status(200).send({cards})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        
    },

    Update(req, res){
                
        
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