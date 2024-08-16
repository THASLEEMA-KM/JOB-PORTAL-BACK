const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const admins = require('../models/adminModel')
const savedjobs = require('../models/savedJobModel')
const appliedjobs = require('../models/applyJobModel')

exports.registerController = async (req,res)=>{
    console.log("Inside registercontroller");
    const {username,email,password,mobile,gender,location,skill,experience} = req.body
    console.log(username,email,password,mobile,gender,location,skill,experience);
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exist! Please login")
        }
        else{
            const newUser = new users({
                username,email,password,mobile,gender,location,skill,experience,resumeFile:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
// exports.loginController = async (req,res) =>
//     {
//         console.log("inside Login");
//         const {email,password} = req.body
//         console.log(email,password);
//         try {
//             const existingUser = await users.findOne({email,password})
//             if(existingUser)
//                 {
//                     // token generate
//                     const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
//                     res.status(200).json({
//                         user:existingUser,
//                         token
//                     })
//                 }else{
//                     res.status(404).json("Invalid Email / Password..")
//                 }
//         } catch (error) {
//             res.status(401).json(error)
            
//         }
//     } 

    exports.loginController = async (req,res) =>
        {
            console.log("inside Login");
            const {email,password} = req.body
            console.log(email,password);
            try {
                const existingUser = await users.findOne({email,password})
                const adminUser = await admins.findOne({email,password})
                if(adminUser)
                    {
                        // token generate
                        const token = jwt.sign({adminId:adminUser._id},process.env.JWT_PASSWORD)
                        res.status(200).json({
                            admin:adminUser,
                            token
                        })
                    }
                else if(existingUser)
                    {
                        // token generate
                        const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
                        res.status(200).json({
                            user:existingUser,
                            token
                        })
                    }else{
                        res.status(404).json("Invalid Email / Password..")
                    }
            } catch (error) {
                res.status(401).json(error)
                
            }
        } 

//get user details
exports.userDetailsController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);

    try {

        const userProfile = await users.findOne({ _id: userId })
        res.status(200).json(userProfile)

    } catch (error) {
        res.status(401).json(error)
    }

}

// //  save jobs
// exports.savedJobsController = async (req,res) =>{
//     console.log("Inside Saved Jobs Controller");
//     const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
   
//     const userId = req.payload
//     console.log("Request Params:", req.params);

//     try {
//         console.log("inside try");   
//         const {id} = req.params
//         console.log(`user id is : ${userId} and id is ${id}`);
//         const existingJob = await savedjobs.findOne({_id:id,userId})
//         console.log(`existing job list ${existingJob}`);
//         if(existingJob){
//             res.status(406).json("Job Already Saved to Your Collection!")
//         }else{
//             const newJob = new savedjobs({
//                 _id:id,title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline,userId
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


// // get saved jobs
// exports.getSavedJobsController = async (req,res)=>{
//     console.log("inside get savedjobs");
//     const userId = req.payload
//     try {
//         const allSavedJobs = await savedjobs.find({userId})
//         res.status(200).json(allSavedJobs)
//         console.log(allSavedJobs);

//     } catch (error) {
//         res.status(401).json(error)
//     }
// }

// // remove saved job 
// exports.removeSavedJobController = async (req,res)=>{
//     console.log(("Inside remove saved job controller"));
//     const {id} = req.params
//     try {
//         const removeSavedJob = await savedjobs.findByIdAndDelete({_id:id})
//         res.status(200).json(removeSavedJob)
//     } catch (error) {
//         res.status(401).json(error)
//     }
    
// }

// // exports.applyJobController = async(req,res) =>{
// //     const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = req.body
// //     const {userId} = req.payload
// //     const {id} = req.params
// //     console.log(`id ${id} and userid ${userId} `);
// //     const alreadyapplied = await appliedjobs.findOne({_id:id,userId})
// //     if(alreadyapplied){
// //         res.status(406).json(alreadyapplied)
// //     }else{
// //         const newApplication = new appliedjobs({
// //             title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline,userId
// //         })
// //         await newApplication.save()
// //         res.status(200).json(newApplication)
// //         console.log(newApplication);
// //     }
// // }

// exports.applyJobsController = async (req,res) =>{
//     console.log("Inside Apply Jobs Controller");
//     const {title,username,email,mobile} = req.body
//     const {id} = req.params
//     const userId = req.payload
//     const resumeFile = req.file.filename
//     console.log(`resume is ${resumeFile}`);
    
//     console.log(`user id is : ${userId} and id is ${id}`);
//     try {
//         const alreadyapplied = await appliedjobs.findOne({_id:id,userId})
//         console.log(`exist ${alreadyapplied}`);
//         if(alreadyapplied){
//             res.status(406).json("Job Already applied!")
//         }else{
//             const newApplication = new appliedjobs({
//                 _id:id,title,username,email,mobile,resumeFile,userId
//             })
//             await newApplication.save()
//             res.status(200).json(newApplication)
//             console.log(`Applied job is 
//                 ${newApplication}
//                 `);
//         }
        
//     } catch (error) {
//         res.status(401).json(error)
//         console.log(error);
//     }

// }

// exports.getAppliedJobsController = async(req,res)=>{
//     console.log("Inside get applied jobs controller");
//     const userId = req.payload
//     console.log(`line 203 userid ${userId}`);
    
//     try {
//         const allAppliedJobs = await appliedjobs.find({userId})
//         res.status(200).json(allAppliedJobs)
//         console.log(allAppliedJobs);
        
//     } catch (error) {
//         res.status(401).json(error)
//         console.log(`line 210 ${error}`);
        
//     }
    
// }