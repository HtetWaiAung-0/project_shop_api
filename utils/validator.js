const schemas = require('./schemas.js')

module.exports = {
    validateBody:(schemas)=>{
        return (req,res,next)=>{
            let result = schemas.validate(req.body)
            if(!result.error){
                return next()
            }else{
                console.log(result.error)
                throw new Error("Validate Fail")
                
            } 
        }
    }
}


