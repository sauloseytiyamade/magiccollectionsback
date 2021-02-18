const sharp = require('sharp')
const path = require('path')
const fs = require('fs')


const resizeFile = (req, res, next) => {
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
    
}

module.exports = resizeFile