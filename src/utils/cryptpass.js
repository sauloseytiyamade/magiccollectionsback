const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    // Encripta a senha para ser salva no banco de dados
    encript(pass){
        return new Promise((resolve, reject) => {
            bcrypt.hash(pass, saltRounds, (err, hash) => {
                if(err){
                    reject(err)
                }else{
                    resolve(hash)
                }
            })
        })
    },

    // Executa a comparação da senha que é recebida no banco de dados com a senha do banco de dados
    compare(pass,bdpass){
        return new Promise((resolve, reject) => {
            bcrypt.compare(pass,bdpass, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}