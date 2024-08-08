// const admins = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const jobs = require('../models/jobModel');
const appliedjobs = require('../models/applyJobModel');

// exports.adminLoginController = async (req,res) =>
//     {
//         console.log("inside admin Login");
//         const {email,password} = req.body
//         console.log(email,password);
//         try {
//             const adminUser = await admins.findOne({email,password})
//             if(adminUser)
//                 {
//                     // token generate
//                     const token = jwt.sign({adminId:adminUser._id},process.env.JWT_PASSWORD)
//                     res.status(200).json({
//                         admin:adminUser,
//                         token
//                     })
//                 }else{
//                     res.status(404).json("Invalid Email / Password..")
//                 }
//         } catch (error) {
//             res.status(401).json(error)
//             console.log(error);
            
//         }
//     }

// add job

exports.postJobController = async(req,res) =>{
    console.log("Inside PostJobController");
    const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
    console.log(title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline);
    const adminId = req.payload
    console.log(adminId);
    
    // const {id} = req.params
    // console.log(id);
    // console.log("Request Params" , req.params);
    // if(adminId)
    // {
    //     try {
    //         // const existingJob = jobs.findOne({_id:id})
    //         // if(existingJob){
    //         //     res.status(406).json("Job Already exist!")
    
    //         // }
    //         // else
    //         // {
    //         //     const newJob = new jobs({
    //         //         title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline
    //         //     })
    //         //     await newJob.save()
    //         //     res.status(200).json(newJob)
        
    //         // }
    //         const newJob = new jobs({
    //             title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline
    //         })
    //         await newJob.save()
    //         res.status(200).json(newJob)
            
    //     } catch (error) {
    //         res.status(401).json(error)
    //     }
        
    // }
    // else{
    //     res.status(406).json("please login as admin")
    // }

    try {
        
        const newJob = new jobs({
            title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline
        })
        await newJob.save()
        res.status(200).json(newJob)

    } catch (error) {
        res.status(401).json(error)
    }

}

// view all jobs
exports.viewAllJobController = async(req,res)=>{
    console.log("Inside viewAjobController");
    try {
        const allJobs = await jobs.find()
        res.status(200).json(allJobs)
    } catch (error) {
        res.status(401).json(error)
    }
}

// view a job
exports.viewAJobController = async(req,res)=>{
    console.log("Inside viewAJobController");
    const {id}= req.params
    console.log(id);
    try {
        const singleJob = await jobs.findOne({_id:id})
        res.status(200).json(singleJob)
        console.log(singleJob);
    } catch (error) {
        res.status(401).json(error)
    }
}
// remove job
exports.removeJobController = async(req,res)=>{
    console.log("Inside remove Job Controller");
    const {id} = req.params
    console.log(id);
    try {
        const removeJob = await jobs.findByIdAndDelete({_id:id})
        res.status(200).json(removeJob)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.getAppliedJobsController = async(req,res)=>{
    console.log("Inside get applied jobs controller");
    const adminId = req.payload
    console.log(`line 39 userid ${adminId}`);
    
    try {
        console.log(("inside try block of get applied"));
        
        const allApplications = await appliedjobs.find()
        res.status(200).json(allApplications)
        console.log(allApplications);
        
    } catch (error) {
        res.status(401).json(error)
        console.log(`line 48 ${error}`);    
    }
    
}