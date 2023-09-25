let formatMsg = (con,msg,result)=>{
    if(con == 1){
        return {"con":true,"msg":msg,"result":result}
    }else{
        return {"con":false,"msg":msg}
    }

}
let savePhoto = (req,name)=>{
    let path = `./gallerys/${name}.png`
    req.body.image = `http://localhost:3000/gallery/${name}.png`
    req.files.photo.mv(path,(err)=> {throw new Error('photo uploading failed')})
    
}
module.exports = {
    formatMsg,
    savePhoto
}