const mongoose = require('mongoose')

const applyJobModelSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    resumeFile:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    // id:{
    //     type:String,
    //     required:true
    // }
    jobId: {  
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],  
        default: 'Pending', 
        required: true
    }
})

const appliedjobs = mongoose.model("appliedjobs",applyJobModelSchema)

module.exports = appliedjobs