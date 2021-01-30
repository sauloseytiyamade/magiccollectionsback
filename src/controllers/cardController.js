const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){        
        //Exibe todos os registros da tabela
        database.select(
            'cds.id as id',
            'cds.cardName as card_name',
            'cdc.color as card_color',
            'cdc.id as color_id',
            'cde.id as edition_id',
            'cde.edition as edition',
            'cde.code as edition_code',
            'cdr.id as rarity_id',
            'cdr.rarity as rarity',
            'cdt.id as type_id',
            'cdt.type as card_type'
        )
        .from('cards as cds')
        .innerJoin('cardcolor as cdc', 'cds.cardColor_id', 'cdc.id')
        .innerJoin('cardedition as cde', 'cds.cardEdition_id', 'cde.id')
        .innerJoin('cardrarity as cdr', 'cds.cardRarity_id', 'cdr.id')
        .innerJoin('cardtype as cdt', 'cds.cardType_id', 'cdt.id')
        .then(resp => {
            res.json(resp)
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


        database.select('cardName').where({'cardName': cardName, 'cardEdition_id': cardEdition_id}).table('cards').then(card => {
            //Verifica se existe algum registro com este nome e edição            
            if(card.length >= 1){
                //Caso exista apresenta o erro
                res.status(409).send({message: 'card exist'})
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
                database.select('cardName').where({'cardName': cardName, 'cardEdition_id': cardEdition_id}).table('cards').then(card => {
                    //Atualiza o registro no banco de dados utilizando o id
                    database.where({id}).update(body).table('cards').then(card => {
                        res.status(200).send({message: 'card updated'})
                    }).catch(err => {
                        res.status(400).send(err)
                    }) 
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
                    res.status(200).send({message: 'card deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    }
}