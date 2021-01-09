const database = require('../utils/database')
const cryptpass = require('../utils/cryptpass')
const validator = require('validator')
const querysDatabase = require('../utils/querysDatabase')
const generateWebToken = require('../utils/generateWebToken')
const { isEmpty } = require('lodash')

module.exports = {

    Login(req, res){
        //Pega email e senha passado pelo usuário
        const {email, password} = req.body

        //Verifica se este é um e-mail válido
        if(validator.isEmail(email)){            
            //Verifica no banco se existe este e-mail
            querysDatabase.verifyEmail(email, 'users')
                .then(resp => {
                    if(isEmpty(resp)){
                        //Se não existir e-mail ele apresenta essa mensagem
                        res.json({message: 'user not found'})
                    }else{
                        //Existe e-mail no banco de dados
                        //Busca a senha no banco de dados
                        database.select('name', 'email', 'password', 'permission').where({email}).table('users').then(dbpass => {
                            //Verifica se a senha informada bate com a senha do banco
                            cryptpass.compare(password,dbpass[0].password)
                                .then(resp => {
                                    if(!resp){
                                        //Se não bater apresenta essa mensagem
                                        res.json({message: 'user or password invalid'})
                                    }else{
                                        //Se bater monta o objeto JWT
                                        const JwtData = {
                                            iss: 'magic collections',
                                            name: dbpass[0].name,
                                            mail: dbpass[0].email,
                                            permission: dbpass[0].permission,
                                            exp: Math.floor(Date.now() / 1000) + 32400,
                                        }

                                        // Cria o token JWT com os dados do objeto
                                        generateWebToken.generate(JwtData)
                                            .then(resp => {
                                                //Envia o token JWT com os dados
                                                res.json(resp)
                                        })
                                        
                                    }
                                })                           

                        })
                        
                    }
                })
        }else{
            res.json({message: 'invalid email'})
        }
        
    }
}