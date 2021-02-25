const multer = require('multer')
const path = require('path')

// Defini o nome do arquivo e o local que será salvo
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/images/')
    },
    filename:(req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

//Faz um filtro nos arquivos. Apenas aceita jpg e png
const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }else{
        cb(new Error('file not supported'))
    }
}

// Salva o arquivo executando o filtro
const fileUpload = multer({storage, fileFilter})

module.exports = fileUpload