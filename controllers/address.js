const addressDb = require('../models/address')
const helper = require('../utils/helper')

let create = async(req,res)=>{
    if(req.files){
        let result = await addressDb(req.body).save()
        res.send(helper.formatMsg(1,'successfully updated',result))
    }else{
        res.send(helper.formatMsg(0,'Register Fail'))
    }
}

let getAll = async(req,res)=>{
    let result = await addressDb.findAll()
    res.send(result)
}

let update = async(req,res)=>{
    let address = await addressDb.findById(req.params.id)
   if(address != null){
        let result = await addressDb.findByIdAndUpdate(req.params.id,req.body) 
            res.send(helper.formatMsg(1,'Successfully updated',result))

   }else{res.send(helper.formatMsg(0,"Address Data not found"))}
}
module.exports = {
    create,
    getAll,
    update
}