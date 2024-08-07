const appliedjobs = require('../models/applyJobModel')


exports.applyJobsController = async (req,res) =>{
    console.log("Inside Apply Jobs Controller");
    const {title,username,email,mobile} = req.body
    const {id} = req.params
    const userId = req.payload
    const resumeFile = req.file.filename
    console.log(`resume is ${resumeFile}`);
    
    console.log(`user id is : ${userId} and id is ${id}`);
    try {
        const alreadyapplied = await appliedjobs.findOne({jobId:id,userId})
        console.log(`exist ${alreadyapplied}`);
        if(alreadyapplied){
            res.status(406).json("Job Already applied!")
        }else{
            const newApplication = new appliedjobs({
                title,username,email,mobile,resumeFile,userId,jobId:id
            })
            await newApplication.save()
            res.status(200).json(newApplication)
            console.log(`Applied job is 
                ${newApplication}
                `);
        }
        
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }

}

exports.getAppliedJobsController = async(req,res)=>{
    console.log("Inside get applied jobs controller");
    const userId = req.payload
    console.log(`line 39 userid ${userId}`);
    
    try {
        console.log(("inside try block of get applied"));
        
        const allAppliedJobs = await appliedjobs.find({userId})
        res.status(200).json(allAppliedJobs)
        console.log(allAppliedJobs);
        
    } catch (error) {
        res.status(401).json(error)
        console.log(`line 48 ${error}`);    
    }
    
}

// exports.getAppliedJobsController = async (req, res) => {
//     console.log("Inside Get Applied Jobs Controller");
//     const userId = req.payload;
//     console.log(`User ID: ${userId}`);
    
//     try {
//         console.log("Inside try block of get applied jobs");
//         const allAppliedJobs = await appliedjobs.find({ userId });
//         console.log(`Found ${allAppliedJobs.length} applied jobs`);
//         res.status(200).json(allAppliedJobs);
//         console.log(allAppliedJobs);
//     } catch (error) {
//         res.status(401).json(error);
//         console.log(error);
//     }
// };
