const mongoose = require('mongoose')
const SpecModel = mongoose.Schema({
    color:{type:String,required:true},
    size:{type:String,required:true},
    quantity:{type:Number,required:true},
    product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'product'},
    deletestatus:{type:Boolean,default:false},
    created:{type:Date,default:Date.now()},
    updated:{type:Date,default:Date.now()},
})
const Spec = mongoose.model('spec',SpecModel)
module.exports = Spec