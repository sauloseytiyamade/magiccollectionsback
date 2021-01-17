const database = require('../utils/database')
const moment = require('moment')

module.exports = {
    Index(req, res){ 
        // Busca todas as cartas da coleção       
        database.select(
            'c.id as id',
            's.id as user_id',
            's.name as user_name', 
            'cds.id as card_id', 
            'cds.cardName as card_name', 
            'cdt.id as type_id', 
            'cdt.type as card_type', 
            'cdc.id as color_id', 
            'cdc.color as card_color', 
            'cde.id as edition_id', 
            'cde.edition as edition', 
            'cde.code as edition_code',
            'cdr.id as rarity_id',
            'cdr.rarity as rarity',
            'cdq.id as quality_id',
            'cdq.quality as quality',
            'cdl.id as id_language',
            'cdl.language as language',
            'c.quantity as quantity'
        )
        .from('collection as c')
        .innerJoin('users as s', 'c.user_id', 's.id')
        .innerJoin('cards as cds', 'c.cards_id', 'cds.id')
        .innerJoin('cardcolor as cdc', 'cds.cardColor_id', 'cdc.id')
        .innerJoin('cardtype as cdt', 'cds.cardType_id', 'cdt.id')
        .innerJoin('cardedition as cde', 'cds.cardEdition_id', 'cde.id')
        .innerJoin('cardrarity as cdr', 'cds.cardRarity_id', 'cdr.id')
        .innerJoin('cardquality as cdq', 'c.cardQuality_id', 'cdq.id')
        .innerJoin('cardlanguage as cdl', 'c.cardLanguage_id', 'cdl.id')
        .then(resp => {
            res.json(resp)
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Show(req, res){
        // Busca todas as cartas de um determinado usuário {id}
        const {id} = req.params
        database.select(
            'c.id as id',
            's.id as user_id',
            's.name as user_name', 
            'cds.id as card_id', 
            'cds.cardName as card_name', 
            'cdt.id as type_id', 
            'cdt.type as card_type', 
            'cdc.id as color_id', 
            'cdc.color as card_color', 
            'cde.id as edition_id', 
            'cde.edition as edition', 
            'cde.code as edition_code',
            'cdr.id as rarity_id',
            'cdr.rarity as rarity',
            'cdq.id as quality_id',
            'cdq.quality as quality',
            'cdl.id as id_language',
            'cdl.language as language',
            'c.quantity as quantity'
        )
        .from('collection as c')
        .innerJoin('users as s', 'c.user_id', 's.id')
        .innerJoin('cards as cds', 'c.cards_id', 'cds.id')
        .innerJoin('cardcolor as cdc', 'cds.cardColor_id', 'cdc.id')
        .innerJoin('cardtype as cdt', 'cds.cardType_id', 'cdt.id')
        .innerJoin('cardedition as cde', 'cds.cardEdition_id', 'cde.id')
        .innerJoin('cardrarity as cdr', 'cds.cardRarity_id', 'cdr.id')
        .innerJoin('cardquality as cdq', 'c.cardQuality_id', 'cdq.id')
        .innerJoin('cardlanguage as cdl', 'c.cardLanguage_id', 'cdl.id')
        .where({user_id: id})
        .then(resp => {
            res.json(resp)
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Create(req, res){
        const body = req.body
        const {user_id, cards_id} = req.body
        body['created_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')

        database.select().where({user_id, cards_id}).table('collection').then(collection => {
            //Verifica se o usuário já não tem a mesma carta na coleção
            if(collection.length >= 1){
                //Se tiver a mesma carta é exibida a mensagem
                res.status(409).send({message: 'card exist collection'})
            }else{
                //Caso contrário é inserido um registro na tabela
                database.insert(body).into('collection').then(collection => {
                    res.status(201).send({message: 'card collection created', id: collection[0]})
                })
            }
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    Update(req, res){
        const {id} = req.params
        const body = req.body
        const {user_id, cards_id} = req.body
        body['updated_at'] = moment().format('YYYY-MM-DD HH:mm:ss')
        database.select('id').where({id}).table('collection').then(collection => {
            //Caso o id não exista
            if(collection.length == 0){
                res.status(404).send({message: 'card collection not exist'})
            }else{
                database.select().where({user_id, cards_id}).table('collection').then(collection => {
                    //Verifica se o usuário já não tem a mesma carta na coleção
                    if(collection.length >= 1){
                        //Se tiver a mesma carta é exibida a mensagem
                        res.status(409).send({message: 'card exist collection'})
                    }else{
                        //Caso contrário altera o registro
                        database.where({id}).update(body).table('collection').then(collection => {
                            res.status(200).send({message: 'card collection updated'})
                        }).catch(err => {
                            res.status(400).send(err)
                        })
                    }
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        }).catch(err => {
            res.status(400).send(err)
        })

        
    },

    Delete(req, res){
        const {id} = req.params
        //Verifica se o id no banco de dados existe
        database.select('id').where({id}).table('collection').then(collection => {
            //Caso o id não exista
            if(collection.length == 0){
                res.status(404).send({message: 'card collection id not exist'})
            }else{
               //Caso exista deleta o registro no banco de dados utilizando o id
                database.where({id}).delete().table('collection').then(collection => {
                    res.status(200).send({message: 'card collection deleted'})
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    }
}