const subcategoryDb = require('../models/subcategory')
const catgoryDb = require('../models/category')
const helper = require('../utils/helper')

let create = async(req,res)=>{
    //check file is attach in req
    if(req.files){
        let path = `./gallery/${req.body.name}.png`//specified directory to store photo
        req.body.image = `http://localhost:3000/gallery/${req.body.name}.png`//spicified url 
        req.files.photo.mv(path)//store photo file to the specified directory
        req.body.category = req.params.id //add category in the req.body
        let result = await subcategoryDb(req.body).save()//saving req.body to Db
        //saveing new subcat id to the subcats of category Db
        let cat = await catgoryDb.findById(req.params.id)
        let subcats = cat.subcats
        subcats.push(result.id)
        await catgoryDb.findByIdAndUpdate(req.params.id,{"subcats":subcats})
        
        res.send({'result':result})//send res to user
    }else{
        res.send({result:'photo is require'})
    }
}
let update = async(req,res,next)=>{
    //checking req.params.id is exiting in subcatDb
    let subcat = await subcategoryDb.findById(req.params.id)
    if(subcat){
        if(req.files){
            if(req.body.name){
                helper.savePhoto(req,req.body.name)
                await subcategoryDb.findByIdAndUpdate(subcat.id,req.body)
                res.status(200).json(helper.formatMsg(1,'Successfully updated'))
            }else{
               console.log(subcat.name)
               helper.savePhoto(req,subcat.name)
               await subcategoryDb.findByIdAndUpdate(subcat.id,req.body)
               res.status(200).json(helper.formatMsg(1,'Successfully updated'))
            }
        }else{
            await subcategoryDb.findByIdAndUpdate(subcat.id,req.body)
            res.status(200).json(helper.formatMsg(1,'Successfully updated'))
        }
    }else{
        res.status(230).json(helper.formatMsg(0,'Subcategory not found'))
    }
}
module.exports = {
    create,
    update
}