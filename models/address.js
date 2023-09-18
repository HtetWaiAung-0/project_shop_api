const mongoose = require('mongoose')
const {Schema} = mongoose
const AddrModel = new Schema({
    region:{type:String,required:true},
    city:{type:String,required:true},
    townShip:{type:String,required:true},
    phoneNo:{type:String,required:true}
})
const Address = mongoose.model('address',AddrModel)
module.exports = Address
