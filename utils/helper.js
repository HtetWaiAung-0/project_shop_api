let formatMsg = (con,msg,result)=>{
    if(con == 1){
        return {"con":true,"msg":msg,"result":result}
    }else{
        return {"con":false,"msg":msg}
    }

}
module.exports = {
    formatMsg
}