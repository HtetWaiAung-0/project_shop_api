const res = require('express/lib/response')
const CatDb  = require('../models/category')
const helper = require('../utils/helper')

let create =  async(req,res)=>{
    if(req.files){
       let path = `./gallery/category/${req.body.name}.png` 
       req.body.image = `http://localhost:3000/gallery/category/${req.body.name}.png`
       req.files.photo.mv(path)
       let result = await new CatDb(req.body).save()
       res.send({con:true,msg:'Success','result':result})
    }else{
        res.send({result:'Photo is require'})
    }

}
let update = async(req,res)=>{
   let cat = await CatDb.findById(req.params.id)
   if(cat != null){
    if(req.files){
        let path = `./gallery/${cat.name}.png`
        req.body.image = `http://localhost:3000/gallery/${cat.name}.png`
        req.files.photo.mv(path).then(
           async()=>{
           let result = await CatDb.findByIdAndUpdate(req.params.id,req.body) 
            res.send(helper.formatMsg(1,'successfully updated',result))
           }
        )
    }else{
        let result = await CatDb.findByIdAndUpdate(req.params.id,req.body) 
            res.send(helper.formatMsg(1,'successfully updated',result))
    }
   }else{res.send(helper.formatMsg(0,"Category not found"))}
}
let all = async(req,res)=>{
    let result = await (await CatDb.find().populate({path:'subcats',populate:{path:'childCat'}}))
    res.send(result)
}
module.exports = {
    create,
    all,
    update
}