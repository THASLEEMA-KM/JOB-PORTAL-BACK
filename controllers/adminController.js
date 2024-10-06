const jwt = require('jsonwebtoken')
const jobs = require('../models/jobModel');
const appliedjobs = require('../models/applyJobModel');

// add job
exports.postJobController = async(req,res) =>{
    console.log("Inside PostJobController");
    const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
    console.log(title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline);
    const adminId = req.payload
    // console.log(adminId);
    
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

// edit a job
exports.editAJobController = async(req,res)=>{
    console.log("INside edit a job controller");
    const {id} = req.params
    const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
    try {
        const updatedJob = await jobs.findByIdAndUpdate({_id:id},{title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline})
        await updatedJob.save()
        res.status(200).json(updatedJob)
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

//get applied jobs
exports.getAppliedJobsController = async(req,res)=>{
    console.log("Inside get applied jobs controller");
    const adminId = req.payload
    console.log(`line 39 userid ${adminId}`);
    const {id} = req.params
    console.log(id);
    
    try {
        console.log(("inside try block of get applied"));
        
        const allApplications = await appliedjobs.find({jobId:id})
        res.status(200).json(allApplications)
        console.log(allApplications);
        
    } catch (error) {
        res.status(401).json(error)
        console.log(`line 48 ${error}`);    
    }
    
}

//get all applied jobs
exports.getAllAppliedJobsController = async(req,res)=>{
    console.log("Inside get applied jobs controller");
    // const adminId = req.payload
    // console.log(`line 39 userid ${adminId}`);
    const {id} = req.params
    // console.log(id);
    
    try {
        console.log(("inside try block of get applied"));
        
        const allApplications = await appliedjobs.find()
        res.status(200).json(allApplications)
        console.log(allApplications);
        
    } catch (error) {
        res.status(401).json(error)
        // console.log(`line 48 ${error}`);    
    }
    
}

// update job status
exports.updateJobStatusController = async(req,res)=>{
    console.log("Inside update stts job");
    const { applicationId } = req.params;
    const { status } = req.body;

    try {
        // Find the applied job by ID and update its status
        const application = await appliedjobs.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

// remove user applied job
exports.removeApplicationConttoller = async(req,res)=>{
    console.log("Inside remove application controller");
    const {id} = req.params
    try {
        const allUserApplications = await appliedjobs.findByIdAndUpdate({_id:id})
        res.status(200).json(allUserApplications)
        console.log(allUserApplications);
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}