const mongoose = require('mongoose')
const {Schema} = mongoose
const CatModel = new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    subcats : [{type:Schema.Types.ObjectId,ref:'subcategory'}],
    created:{type:Date,default:Date.now()},
    updated:{type:Date,default:Date.now()},
    deletestatus:{type:Boolean,default:false}
})
const Category = mongoose.model('category',CatModel)
module.exports = Category

