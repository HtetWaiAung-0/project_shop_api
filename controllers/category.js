const CatDb  = require('../models/category')
const helper = require('../utils/helper')

let create =  async(req,res)=>{
    let cat = await CatDb(req.body).save();
    let result = cat.toObject()
    delete result.deletestatus
    res.status(200).json(helper.formatMsg(1,'Success',result))
}
let update = async(req,res)=>{
    await CatDb.findByIdAndUpdate(req.params.id,req.body)
    let cat = await CatDb.findById(req.params.id)
    let result = cat.toObject()
    delete result.deletestatus
    res.status(200).json(helper.formatMsg(1,'Success',result))
}
let paginate = async(req,res)=>{
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page-1) * limit
    let cats =  await CatDb.find({'deletestatus':false}).skip(skip).limit(limit)
    let result =[]
    cats.forEach(cat => {
        var category = cat.toObject()
        delete category.deletestatus
        result.push(category)
    });
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