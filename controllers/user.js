const userDb = require('../models/user')
const helper = require('../utils/helper')

let create = async(req,res)=>{
    if(req.files){
        let result = await userDb(req.body).save()
        res.send(helper.formatMsg(1,'successfully updated',result))
    }else{
        res.send(helper.formatMsg(0,'Register Fail'))
    }
}

let getAll = async(req,res)=>{
    let result = await userDb.findAll()
    res.send(result)
}

let update = async(req,res)=>{
    let user = await userDb.findById(req.params.id)
   if(user != null){
        let result = await userDb.findByIdAndUpdate(req.params.id,req.body) 
            res.send(helper.formatMsg(1,'Successfully updated',result))

   }else{res.send(helper.formatMsg(0,"user Data not found"))}
}
module.exports = {
    create,
    getAll,
    update
}