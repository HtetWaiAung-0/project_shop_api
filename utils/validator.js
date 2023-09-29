const helper = require('./helper')
module.exports = {
    validateBody:(schemas)=>{
        return (req,res,next)=>{
            let result = schemas.validate(req.body)
            if(!result.error){
                return next()
            }else{
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
    isExitName:(db)=>{
        return async(req,res,next)=>{
            let result = await db.findOne({name:req.body.name})
            if(!result)next();
            else {
                res.status(203).json(helper.formatMsg(0,`${req.body.name} is already exit`))
            }
        }
    },
    isExitId:(db)=>{
        return async(req,res,next)=>{
            let result = await db.findById(req.params.id)
            if(result)next();
            else {
                throw new Error('Id not found')
            }
        }
    },
    uploadNewPhoto : (dir)=>{
        return (req,res,next)=>{
            if(req.files){
                let fileName = `${dir}/${Date.now()}${req.files.photo.name}`;
                let path = `./gallery/${fileName}`
                req.body.image = `http://localhost:3000/gallerys/${fileName}`
               req.files.photo.mv(path, err =>{
                    if(err){
                        res.status(500).json(helper.formatMsg(0,err.message))
                    }
                    else next()})
            }else {
                res.status(400).json(helper.formatMsg(0,'photo is required for this function'))
            };
        }
    },
    updatePhoto :(dir)=>{
        return (req,res,next)=>{
            if(req.files){
                let fileName = `${dir}/${Date.now()}${req.files.photo.name}`;
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


