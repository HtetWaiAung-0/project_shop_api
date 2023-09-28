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
let paginate = async(req,res)=>{
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page-1) * limit
    let result =  await CatDb.find({'deletestatus':false}).skip(skip).limit(limit)
    res.status(200).json(helper.formatMsg(1,'Success',result))
}

let removeCatById = async(req,res)=>{
    let cat = await CatDb.findById(req.params.id)
    if(cat.deletestatus){
     res.status(203).json(helper.formatMsg(0,'Cat not found'))
    }else{
        let result =  await CatDb.findByIdAndUpdate(cat.id,{'deletestatus':true})
     res.status(200).json(helper.formatMsg(1,`'${result.name}' is deleted`))
    }
}
module.exports = {
    create,
    paginate,
    update,
    removeCatById
}