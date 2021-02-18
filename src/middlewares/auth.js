require('dotenv/config')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const authHeader = req.headers.authorization;   

    if(!authHeader)
        return res.status(401).send({message: 'No token provided'});
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({message: 'Token error'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({message: 'Token malformatted'});
    
    jwt.verify(token,process.env.APP_KEY_WEB_TOKEN,(err,decoded) => {
        if(err) return res.status(401).send({message:'Token invalid'});
        
        return next();
    })
}