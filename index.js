require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const cloudinary= require('cloudinary').v2
const fileupload = require('express-fileupload')
const PORT  = process.env.PORT || 5000
const authRouter = require('./route/authRouter')
const storyRouter = require('./route/storyRouter')
const auth = require('./middleware/authentication')

//clousinary config 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



//midddleware 
app.use(fileupload({useTempFiles: true}))
app.use(express.json());
app.use(cors());


//routes
app.use('/api', authRouter)
app.use ('/api', auth, storyRouter)

//error routes
app.use ((req, res) =>{
    res.status(404).json({ message : "Resources not found "})
})

//db connection

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "POSTITDB",
        })
        
       app.listen(PORT, ()=>{
        console.log('server running');
       })
    }catch(error){
        console.log(error); 
    }
}


startServer()
