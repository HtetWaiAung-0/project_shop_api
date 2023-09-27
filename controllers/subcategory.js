const subcategoryDb = require('../models/subcategory')
const catgoryDb = require('../models/category')
const helper = require('../utils/helper')

let create = async(req,res)=>{
    
        req.body.category = req.params.id //add category in the req.body
        let result = await subcategoryDb(req.body).save()//saving req.body to Db
        //saveing new subcat id to the subcats of category Db
        let cat = await catgoryDb.findById(req.params.id)
        let subcats = cat.subcats
        subcats.push(result.id)
        await catgoryDb.findByIdAndUpdate(req.params.id,{"subcats":subcats})
        
        res.send({'result':result})//send res to user
}
let update = async(req,res)=>{
    await subcategoryDb.findByIdAndUpdate(req.params.id,req.body)
    let subcat = await subcategoryDb.findById(req.params.id)
    res.status(200).json(helper.formatMsg(1,'Successfully updated',subcat))
    }
let remove = async(req,res)=>{
   let subCat = await subcategoryDb.findById(req.params.id)
   if(subCat.deletestatus){
    res.status(203).json(helper.formatMsg(0,'not found subcat'))
   }else{
    let result =  await subcategoryDb.findByIdAndUpdate(req.params.id,{'deletestatus':true})
   res.status(200).json(helper.formatMsg(1,`'${result.name}' is deleted`))
   }
}
let getAll = async(req,res)=>{
    let subcats = await subcategoryDb.find({'deletestatus':false})
    let results = []
    subcats.forEach(subcat => {
        var result = subcat.toObject()
        delete result.deletestatus
        results.push(result)
    });
    res.status(200).json(helper.formatMsg(1,'All SubCat',results))
}
module.exports = {
    create,
    update,
    remove,
    getAll
}