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
                        res.status(404).send({message: 'user not found'})
                    }else{
                        //Existe e-mail no banco de dados
                        //Busca a senha no banco de dados
                        database.select('id', 'name', 'email', 'password').where({email}).table('users').then(dbpass => {
                            //Verifica se a senha informada bate com a senha do banco
                            cryptpass.compare(password,dbpass[0].password)
                                .then(resp => {
                                    if(!resp){
                                        //Se não bater apresenta essa mensagem
                                        res.status(401).send({message: 'user or password invalid'})
                                    }else{
                                        //Se bater monta o objeto JWT
                                        console.log(dbpass[0]);
                                        const JwtData = {
                                            iss: 'magic collections',
                                            id: dbpass[0].id,
                                            name: dbpass[0].name,
                                            mail: dbpass[0].email,
                                            exp: Math.floor(Date.now() / 1000) + 32400,
                                        }

                                        // Cria o token JWT com os dados do objeto
                                        generateWebToken.generate(JwtData)
                                            .then(resp => {
                                                //Envia o token JWT com os dados
                                                res.status(200).send(resp)
                                        })
                                        
                                    }
                                })                           

                        })
                        
                    }
                })
        }else{
            res.status(404).send({message: 'invalid email'})
        }
        
    }
}