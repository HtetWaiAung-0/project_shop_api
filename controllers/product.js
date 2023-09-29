const productDb = require('../models/product')
const childcatDb = require('../models/childcategory');
const helper = require('../utils/helper');

let create = async(req,res)=>{
    if(!req.files){
        res.status(400).json(helper.formatMsg(0,'photos are required.'))
    }else{
        let album = []
        for (const key in req.files) {
            const photo = req.files[key];
            const savePath = `./gallery/product/${Date.now()}${photo.name}`;
            const image = `http://localhost:3000/gallery/product/${Date.now()}${photo.name}`
            
            photo.mv(savePath, (err) => {
              if (err) {
                return res.status(500).json(helper.formatMsg(0,err.message));
              }else{ 
                album.push(image)
              }
            });
          };
          req.body.childCat = req.params.id;
          req.body.images = album;
          req.body.price = parseInt(req.body.price);

          let result = await productDb(req.body).save();
          res.status(200).json(helper.formatMsg(1,'Success',result))
        
          
        }
        
    }
    
let update = async(req,res)=>{
    await productDb.findByIdAndUpdate(req.params.id,req.body)
    let product = await productDb.findById(req.params.id)
    let result = product.toObject()
    delete result.deletestatus
    res.status(200).json(helper.formatMsg(1,'Success',result))
}

let paginate = async(req,res)=>{
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page-1) * limit
    let products =  await productDb.find({'deletestatus':false}).skip(skip).limit(limit)
    let results =[]
    products.forEach(product => {
        var result = product.toObject()
        delete result.deletestatus
        result.push(result)
        });
    res.status(200).json(helper.formatMsg(1,'Success',results))
    }

let remove = async(req,res)=>{
    let product = await productDb.findById(req.params.id)
    if(product.deletestatus){
    res.status(203).json(helper.formatMsg(0,'not found product'))
    }else{
    let result =  await productDb.findByIdAndUpdate(req.params.id,{'deletestatus':true})
    res.status(200).json(helper.formatMsg(1,`'${result.name}' is deleted`))
    }
        }
module.exports = {
    create,
    update,
    remove,
    paginate

}