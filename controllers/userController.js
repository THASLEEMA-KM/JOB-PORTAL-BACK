const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const admins = require('../models/adminModel')

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

//edit Profile
exports.editProfileController = async(req,res)=>{
    const {username,email,password,mobile,gender,location,skill,experience,resumeFile} = req.body
    const uploadResume = req.file?req.file.filename:resumeFile
    const userId = req.payload
    try {
        const updateProfile = await users.findByIdAndUpdate({_id:userId},{username,email,password,mobile,gender,location,skill,experience,resumeFile:uploadResume},{new:true})
        res.status(200).json(users.updateProfile)
    } catch (error) {
        res.status(401).json(error)
    }
}
