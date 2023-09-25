const mongoose = require('mongoose')
const {Schema} = mongoose
const UserModel = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,require:true}
})

const User = mongoose.model('user',UserModel)
module.exports = User
