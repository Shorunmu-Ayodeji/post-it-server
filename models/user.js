const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        validate: isEmail,

    },
    password:{
        type: String,
        required: true,
        minLength: 7,
        trim: true,
    },
},
{timestamps: true}
);

userSchema.pre('save',async function (next){
    //hashpassword before it is saved 
const salt = await bcrypt.genSalt()
this.password=await bcrypt.hash(this.password,salt)
next();
})

module.exports = mongoose.model("User", userSchema)
