require('dotenv').config()
const express = require('express')

// const categoryRoute = require('./route/category')
// const subcategoryRoute = require('./route/subcategory')
const userRoute = require('./route/user')
const path = require('path')
const fileupload = require('express-fileupload')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`)
app.use(fileupload())
app.use('/gallery',express.static(path.join(__dirname,'gallery')))

app.use(express.json())
app.use('/category',categoryRoute)
app.use('/subcategory',subcategoryRoute)
//Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.message); // Log the error
  
    res.status(500).json({
      error: err.message,
    });
  });
app.use('/user',userRoute)
app.listen(process.env.PORT,()=> console.log(`Server is running at ${process.env.PORT}`))