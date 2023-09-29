const childcatDb = require('../models/childcategory')
const subcatDb = require('../models/subcategory')
const helper = require('../utils/helper')

let create = async(req,res)=>{
        req.body.subcategory = req.params.id 
        let childcat = await childcatDb(req.body).save()
        let result = childcat.toObject()
        delete result.deletestatus
        let subcat = await subcatDb.findById(req.params.id)
        let childcats = subcat.childCat
        childcats.push(result.id)
        await subcatDb.findByIdAndUpdate(req.params.id,{"childCat":childcats})
        
        res.status(200).json(helper.formatMsg(1,"Success",result))//
}
let update = async(req,res)=>{
    await childcatDb.findByIdAndUpdate(req.params.id,req.body)
    let childcat = await subcategoryDb.findById(req.params.id)
    let result = childcat.toObject()
    delete result.deletestatus
    res.status(200).json(helper.formatMsg(1,'Success',result))
    }
let remove = async(req,res)=>{
    let childcat = await childcatDb.findById(req.params.id)
    if(childcat.deletestatus){
    res.status(203).json(helper.formatMsg(0,'not found subcat'))
    }else{
    let result =  await childcatDb.findByIdAndUpdate(req.params.id,{'deletestatus':true})
    res.status(200).json(helper.formatMsg(1,`'${result.name}' is deleted`))
    }
     }
let paginate = async(req,res)=>{
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page-1) * limit
    let childcats =  await childcatDb.find({'deletestatus':false}).skip(skip).limit(limit)
    let result =[]
    childcats.forEach(childcat => {
        var childcategory = childcat.toObject()
        delete childcategory.deletestatus
        result.push(childcategory)
        });
    res.status(200).json(helper.formatMsg(1,'Success',result))
    }
module.exports = {
    create,
    update,
    remove,
    paginate

}