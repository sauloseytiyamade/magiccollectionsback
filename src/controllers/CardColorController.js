const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){

        //Exibe todos os registros da tabela
        database.select().table('cardcolor').then(color => {
            res.status(200).send({color})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        const {id} = req.params

        //Exibe um registro com um id específico
        database.select().where({id}).table('cardcolor').then(color => {
            res.status(200).send({color})
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        const body = req.body
        body['created_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        database.select('color').where({color: body.color}).table('cardcolor').then(color =>{
            //Verifica se existe algum registro com este nome
            if(color.length == 0){
                //Caso não exista cria o registro
                database.insert(body).into('cardcolor').then(color => {
                    res.status(201).send({message: 'color created', id: color[0]})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }else{
                //Caso exista apresenta que o registro já existe
                res.status(409).send({message: 'color exist'})                
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
        database.select('id').where({id}).table('cardcolor').then(color => {
            //Caso o id não exista
            if(color.length == 0){
                res.status(404).send({message: 'color id not exist'})
            }else{
                database.select('color').where({color: body.color}).table('cardcolor').then(color =>{
                    //Verifica se existe algum registro com este nome
                    if(color.length == 0){
                        //Caso não exista atualiza o registros
                        database.where({id}).update(body).table('cardcolor').then(color => {
                            res.status(200).send({message: 'color updated'})
                        })
                    }else{
                        //Caso exista apresenta que o registro já existe
                        res.status(409).send({message: 'color exist'})                
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
        database.select('id').where({id}).table('cardcolor').then(color => {
            //Caso o id não exista
            if(color.length == 0){
                res.status(404).send({message: 'color id not exist'})
            }else{
                // Caso o id exista deleta o registro no banco de dados utilizando o id
                database.where({id}).delete().table('cardcolor').then(color => {
                    res.status(200).send({message: 'color deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })

        
    }
}