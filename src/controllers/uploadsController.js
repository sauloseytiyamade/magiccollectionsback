module.exports = {
    store(req, res){
        if(req.file){
            res.status(200).send({filename: req.file.filename})
        }else{
            res.status(400).send({message: 'upload error'})
        }
    }
}