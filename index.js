require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./db/connection')

const jobPortalServer = express()

jobPortalServer.use(cors())
jobPortalServer.use(express.json())
jobPortalServer.use(router)
jobPortalServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

jobPortalServer.listen(PORT, () =>
    {
        console.log(`Job Portal server started at port : ${PORT}`);
    })
    
jobPortalServer.get('/',(req,res)=>
    {
        res.status(200).send(`<h1 style='color:red;'> Job Portal server started, and waiting for client request!!! </h1>`)
        
    })