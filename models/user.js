const mongoose = require('mongoose')
const {Schema} = mongoose
const UserModel = new Schema({
    name:{type:String,required:true},
    gmail:{type:String,required:true},
    password:{type:String,required:true},
    recoverQ1:{type:String,required:true},
    recoverQ2:{type:String,required:true},
    recoverQ3:{type:String,required:true}
})
const User = mongoose.model('user',UserModel)
module.exports = User
