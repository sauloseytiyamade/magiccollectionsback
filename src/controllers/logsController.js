const database = require('../utils/database')

module.exports = {
    index(req, res){
        //Exibe todos os registros da tabela
        database.select().table('logs').then(logs => {
            res.status(200).send({logs})
        }).catch(err => {
            res.status(400).send(err)
        })
    }
}