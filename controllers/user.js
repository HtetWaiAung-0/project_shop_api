const userDb = require('../models/user')
const helper = require('../utils/helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let register = async(req,res)=>{
    let isExistEmail = await userDb.findOne({email:req.body.email})
    if(isExistEmail){
        res.send(helper.formatMsg(0,'Email is already exit!'))
    }else{
        req.body.password = bcrypt.hashSync(req.body.password,10)
        let userData = await userDb(req.body).save()
        //change to object
        let result = userData.toObject()
        delete result.password

        res.send(helper.formatMsg(1,'Successfully register',result))
    }
}

let login = async(req,res)=>{
    let isExistEmail = await userDb.findOne({email:req.body.email})
    console.log(req.body.password)
    if(isExistEmail){
        let varifyPassword = bcrypt.compareSync(req.body.password,isExistEmail.password)
        if(varifyPassword){
            let result = isExistEmail.toObject()
            delete result.password
            result.token = jwt.sign(result,process.env.SERECT_KEY)
            console.log(result)
            res.send(helper.formatMsg(1,'Successfully Login',result))
        }
    }else{
        res.send(helper.formatMsg(0,'Login Fail!'))
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
    register,
    getAll,
    update,
    login
}