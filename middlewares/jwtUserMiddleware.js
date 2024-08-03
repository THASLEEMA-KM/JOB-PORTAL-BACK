const jwt = require('jsonwebtoken')

const jwtUserMiddleware = (req,res,next)=>
    {
       console.log("Inside jwtUsermiddleware"); 
        const token = req.headers['authorization'].split(" ")[1]
        console.log(token);
        if(token){
            try {
                const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
                console.log(jwtResponse);
                req.payload = jwtResponse.userId
                next()
            } catch (error) {
                res.status(401).json("Invalid Token.., Please Login!!")
            }
        }else{
            res.status(404).json("Missing Token")
        }
    }
    module.exports = jwtUserMiddleware