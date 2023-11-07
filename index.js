require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const PORT  = process.env.PORT || 5000
const authRouter = require('./route/authRouter')


//midddleware 
app.use(express.json());
app.use(cors());


//routes
app.use('/api', authRouter)

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
