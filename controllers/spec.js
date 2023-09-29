const productDb = require('../models/product');
const specDb = require('../models/spec');
const helper = require('../utils/helper');

let create = async(req,res)=>{
    req.body.product = req.params.id;
    let spec = await specDb(req.body).save();
    let result = spec.toObject();
    delete result.deletestatus
    let product = await productDb.findById(result.id);
    let specs = product.specs;
    await productDb.findByIdAndUpdate(result.product,{'specs':specs});
    res.status(200).json(helper.formatMsg(0,'Success',result));
}
let update = async(req,res)=>{
    await specDb.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json(helper.formatMsg(1,'Success'));
}
let remove = async (req,res)=>{
    await productDb.findByIdAndDelete(req.params.id);
    res.status(200).json(1,'Success');
}
module.exports = {
    create,
    update,
    remove
}