const subcategoryDb = require('../models/subcategory')
const catgoryDb = require('../models/category')
const helper = require('../utils/helper')

let create = async(req,res)=>{
    
        req.body.category = req.params.id 
        let subcat = await subcategoryDb(req.body).save()
        let result = subcat.toObject()
        delete result.deletestatus
        let cat = await catgoryDb.findById(req.params.id)
        let subcats = cat.subcats
        subcats.push(result.id)
        await catgoryDb.findByIdAndUpdate(req.params.id,{"subcats":subcats})
        
        res.status(200).json(helper.formatMsg(1,"Successfully created",result))
}
let update = async(req,res)=>{
    await subcategoryDb.findByIdAndUpdate(req.params.id,req.body)
    let subcat = await subcategoryDb.findById(req.params.id)
    let result = subcat.toObject()
    delete result.deletestatus
    res.status(200).json(helper.formatMsg(1,'Success',result))
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
let paginate = async(req,res)=>{
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page-1) * limit
    let subcats =  await subcategoryDb.find({'deletestatus':false}).skip(skip).limit(limit)
    let result =[]
    subcats.forEach(subcat => {
        var subcategory = subcat.toObject()
        delete subcategory.deletestatus
        result.push(subcategory)
    });
    res.status(200).json(helper.formatMsg(1,'Success',result))
}
module.exports = {
    create,
    update,
    remove,
    paginate
}