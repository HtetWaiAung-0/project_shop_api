const mongoose = require('mongoose')
const {Schema} = mongoose
const SubCatModel = new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    category : {type:Schema.Types.ObjectId,ref:'category'},
    childCat : [{type:Schema.Types.ObjectId,ref:'childcategory'}],
    created:{type:Date,default:Date.now()},
    updated:{type:Date,default:Date.now()},
    deletestatus:{type:Boolean,default:true}
})
const SubCategory = mongoose.model('subcategory',SubCatModel)
module.exports = SubCategory

