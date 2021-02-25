const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

//Diminui a foto para 89px/93px
const resizeFile = (req, res, next) => {
    if(req.file){
        const { filename: image } = req.file
        sharp(req.file.path)
        .resize(89,93)
        .jpeg({quality: 50})
        .toFile(
                path.resolve(`${req.file.destination}`,'resized',image)
        )
        .then(data => {
            fs.unlinkSync(req.file.path)
            next()
        })
    }else{
        next()
    }
    
}

module.exports = resizeFile