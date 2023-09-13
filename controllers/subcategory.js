const subcategoryDb = require('../models/subcategory')
const catgoryDb = require('../models/category')

let create = async(req,res)=>{
    if(req.files){
        let path = `./gallery/${req.body.name}.png`
        req.body.image = `http://localhost:3000/gallery/${req.body.name}.png`
        req.files.photo.mv(path)
        req.body.category = req.params.id
        let result = await subcategoryDb(req.body).save()
        let cat = await catgoryDb.findById(req.params.id)
        let subcats = cat.subcats
        subcats.push(result.id)
        await catgoryDb.findByIdAndUpdate(req.params.id,{"subcats":subcats})
        let test = await catgoryDb.findById(req.params.id)
        console.log(test)
        res.send({'result':result})
    }else{
        res.send({result:'photo is require'})
    }
}
module.exports = {
    create
}