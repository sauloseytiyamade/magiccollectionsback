const database = require('./database')

//Verifica se existe o e-mail cadastrado na tabela users
const verifyEmail = async (email, table) => {
    const result = await database.select('email', 'id').where({email}).table(table)
    return result
}

//Verifica se existe cards na tabela collection relacionado a determinado usuário
// user_id = id do usuário na "tabela users"
const verifyCardsPeerUser = async (id) => {
    const result = await database.select().where({user_id: id}).table('collection')
    return result
}

module.exports = {
    verifyEmail,
    verifyCardsPeerUser
}