const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    skill:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    resumeFile:{
        type:String,
    },
    profilePic:{
        type:String,
    }
})


const users = mongoose.model("users",userSchema)

module.exports = users