require('dotenv/config')
const jwt = require('jsonwebtoken');

generate = payload => (
    // Cria uma promessa
    new Promise(resolve => {
        //Gera o token com a Key e o algoritimo
        jwt.sign(payload,process.env.APP_KEY_WEB_TOKEN,{algorithm: 'HS256'}, function(err,token){
            //Caso dê algum erro apresenta a mensagem
            if(err){
                throw new Error('ERR_INVALID_TOKEN');
            }
            //Se funcionar gera o token e envia
            resolve({token});
        })
    })
);

module.exports = {
    generate
}