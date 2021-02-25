require('dotenv/config')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    // Busca no header o parâmetro de autorização
    const authHeader = req.headers.authorization;   

    // Verifica se existe o parâmetro de autorização
    if(!authHeader)
        return res.status(401).send({message: 'No token provided'});
    
    const parts = authHeader.split(' ');

    // Verifica se o parâmetro de autorização tem o tamanho igual a 2
    if(!parts.length === 2)
        return res.status(401).send({message: 'Token error'});

    const [ scheme, token ] = parts;

    //Verifica se o parâmetro de autorização tem as formatação correta
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({message: 'Token malformatted'});
    
    //Verifica se o token é válido utilizando a chave privada
    jwt.verify(token,process.env.APP_KEY_WEB_TOKEN,(err,decoded) => {
        if(err) return res.status(401).send({message:'Token invalid'});
        
        return next();
    })
}