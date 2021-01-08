const database = require('./database')

const verifyEmail = async (email, table) => {
    const result = await database.select('email').where({email}).table(table)
    return result
}

module.exports = {
    verifyEmail
}