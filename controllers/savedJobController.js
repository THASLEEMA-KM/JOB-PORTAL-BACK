const savedjobs = require('../models/savedJobModel')
const jwt = require('jsonwebtoken')


// // save jobs
exports.savedJobsController = async (req,res) =>{
    console.log("Inside Saved Jobs Controller");
    const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
    const {id} = req.params
    const userId = req.payload
    // console.log("Request Body:", req.body);
    console.log("Request Params:", req.params);
    
    
    console.log(`user id is : ${userId} and id is ${id}`);
    try {
        // const objectid = new  ObjectId(id);
        const existingJob = await savedjobs.findOne({id,userId})
        console.log(`existing job list ${existingJob}`);
        if(existingJob){
            res.status(406).json("Job Already Saved to Your Collection!")
        }else{
            const newJob = new savedjobs({
                title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline,userId,id
            })
            await newJob.save()
            res.status(200).json(newJob)
            console.log(`Saved job is 
                ${newJob}
                `);
        }
        
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }

}

// get saved jobs
exports.getSavedJobsController = async (req,res)=>{
    console.log("inside get savedjobs");
    const userId = req.payload
    try {
        const allSavedJobs = await savedjobs.find({userId})
        res.status(200).json(allSavedJobs)
        console.log(allSavedJobs);

    } catch (error) {
        res.status(401).json(error)
    }
}

// remove saved job 
exports.removeSavedJobController = async (req,res)=>{
    console.log(("Inside remove saved job controller"));
    const {id} = req.params
    try {
        const removeSavedJob = await savedjobs.findByIdAndDelete({_id:id})
        res.status(200).json(removeSavedJob)
    } catch (error) {
        res.status(401).json(error)
    }
    
}