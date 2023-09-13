const mongoose = require('mongoose')
const {Schema} = mongoose
const ChildCatModel = new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    subcatgory : {type:Schema.Types.ObjectId,ref:'subcategory'},
    products : [{type:Schema.Types.ObjectId,ref:'product'}],
    created:{type:Date,default:Date.now()},
    updated:{type:Date,default:Date.now()},
    deletestatus:{type:Boolean,required:true}
})
const ChildCategory = mongoose.model('childcategory',ChildCatModel)
module.exports = ChildCategory

