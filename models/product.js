const mongoose = require('mongoose')
const {Schema}   = mongoose
const ProductModel = new Schema({
    name:{type:String,required:true},
    childCat:{type:Schema.Types.ObjectId,ref:'childcategory'},
    image:[{type:String,required:true}],
    price:{type:Number,required:true},
    specs:[{type:Schema.Types.ObjectId}],
    deletestatus:{type:Boolean,required:true},
    created:{type:Date,default:Date.now()},
    updated:{type:Date,default:Date.now()},
})
const Product = mongoose.model('product',ProductModel)
module.exports = Product