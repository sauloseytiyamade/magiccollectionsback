const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
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

    compare(pass,bdpass){
        return new Promise((resolve, reject) => {
            bcrypt.compare(pass,bdpass, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}