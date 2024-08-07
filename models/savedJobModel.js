const mongoose = require('mongoose')

const saveJobModelSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    vacancy:{
        type:Number,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    id:{
        type:String
    }
})

const savedjobs = mongoose.model("savedjobs",saveJobModelSchema)

module.exports = savedjobs