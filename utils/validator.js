const helper = require('./helper')
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
    },
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let result = schema.validate(req.params[name]);
            if (!result.error) next();
            else throw new Error('invalid params');

        }
    },
    isExitId:(db)=>{
        return async(req,res,next)=>{
            let result = await db.findById(req.params.id)
            if(result)next();
            else {
                res.status(203).json(helper.formatMsg(0,'ID not found'))
            }
        }
    },
    uploadNewPhoto : ()=>{
        return (req,res,next)=>{
            if(req.files){
                let fileName = `${Date.now()}${req.files.photo.name}`;
                let path = `./gallery/${fileName}`
                req.body.image = `http://localhost:3000/gallerys/${fileName}`
               req.files.photo.mv(path,err=>{
                    if(err){
                        res.status(500).json(helper.formatMsg(0,err.message))
                    }
                    else next()})
                
                    
                
            }else {
                res.status(400).json(helper.formatMsg(0,'photo is required for this function'))
            };
        }
    },
    updatePhoto :()=>{
        return (req,res,next)=>{
            if(req.files){
                let fileName = `${Date.now()}${req.files.photo.name}`;
                let path = `./gallery/${fileName}`
                req.body.image = `http://localhost:3000/gallerys/${fileName}`
               req.files.photo.mv(path,err=>{
                    if(err){
                        res.status(500).json(helper.formatMsg(0,err.message))
                    }
                    else next()})
                
                    
                
            }else {
                next();
            };
        }
    }
}


