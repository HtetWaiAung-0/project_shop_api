require('dotenv').config()
const express = require('express')
const helper = require('./utils/helper')
const categoryRoute = require('./route/category')
const subcategoryRoute = require('./route/subcategory')
const userRoute = require('./route/user')

const path = require('path')//open path for fileupload
const fileupload = require('express-fileupload')//instant of fileupload lib
const app = express()//run express server
const mongoose = require('mongoose')//instant of mongodb
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`)//build mondb in your device
app.use(fileupload())//run fileuoload function in your app
app.use('/gallery',express.static(path.join(__dirname,'gallery')))//specified the path to store the image

app.use(express.json())//run express.json in your app to use josn
app.use('/category',categoryRoute)
app.use('/subcategory',subcategoryRoute)
app.use('/user',userRoute)
//Global Error Handling


app.listen(process.env.PORT,()=> console.log(`Server is running at ${process.env.PORT}`))

app.use((err, req, res, next) => {
  if(err){
    res.status(500).json(helper.formatMsg(0,err.message))
  }
});