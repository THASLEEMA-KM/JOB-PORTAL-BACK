// const savedjobs = require('../models/savedJobModel')

// // // save jobs
// exports.savedJobsController = async (req,res) =>{
//     console.log("Inside Saved Jobs Controller");
//     const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
//     const {id} = req.params
//     const userId = req.payload
//     // console.log("Request Body:", req.body);
//     console.log("Request Params:", req.params);
    
    
//     console.log(`user id is : ${userId} and id is ${id}`);
//     try {
//         // const objectid = new  ObjectId(id);
//         const existingJob = await savedjobs.findOne({_id:id,userId})
//         console.log(`existing job list ${existingJob}`);
//         if(existingJob){
//             res.status(406).json("Job Already Saved to Your Collection!")
//         }else{
//             const newJob = new savedjobs({
//                 title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline,userId
//             })
//             await newJob.save()
//             res.status(200).json(newJob)
//             console.log(`Saved job is 
//                 ${newJob}
//                 `);
//         }
        
//     } catch (error) {
//         res.status(401).json(error)
//         console.log(error);
//     }

// }