const productDb = require('../models/product')
const childcatDb = require('../models/childcategory')

let create = async(req,res)=>{
    req.body.childCat = req.params.id;
    let product = await productDb(req.body).save()
    let result = product.toObject()
    delete result.deletestatus
    let childcat = await childcatDb.findById(req.params.id)
    let products = childcat.products
    products.push(result.id)
    await subcatDb.findByIdAndUpdate(req.params.id,{"products":products})
    res.status(200).json(helper.formatMsg(1,"Success",result))
}

let update = async(req,res)=>{
    await productDb.findByIdAndUpdate(req.params.id,req.body)
    let product = await productDb.findById(req.params.id)
    let result = product.toObject()
    delete result.deletestatus
    res.status(200).json(helper.formatMsg(1,'Success',result))
}

let paginate = async(req,res)=>{
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page-1) * limit
    let products =  await productDb.find({'deletestatus':false}).skip(skip).limit(limit)
    let results =[]
    products.forEach(product => {
        var result = product.toObject()
        delete result.deletestatus
        result.push(result)
        });
    res.status(200).json(helper.formatMsg(1,'Success',results))
    }

let remove = async(req,res)=>{
    let product = await productDb.findById(req.params.id)
    if(product.deletestatus){
    res.status(203).json(helper.formatMsg(0,'not found product'))
    }else{
    let result =  await productDb.findByIdAndUpdate(req.params.id,{'deletestatus':true})
    res.status(200).json(helper.formatMsg(1,`'${result.name}' is deleted`))
    }
        }
module.exports = {
    create,
    update,
    remove,
    paginate

}