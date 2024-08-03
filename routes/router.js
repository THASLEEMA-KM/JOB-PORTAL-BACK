const express = require('express')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const jwtUserMiddleware = require('../middlewares/jwtUserMiddleware')
const router = new express.Router()

//register- http://localhost:3000/register
router.post('/register',userController.registerController)

//login- http://localhost:3000/login
router.post('/login',userController.loginController)

// // http://localhost:3000/adminlogin
// router.post('/adminlogin',adminController.adminLoginController)

 // http://localhost:3000/postjob
 router.post('/postjob',jwtMiddleware,adminController.postJobController)
 
//  http://localhost:3000/viewjob
router.get('/viewjob',adminController.viewAllJobController)

// http://localhost:3000/viewjob/:id/viewAjob
router.get('/viewjob/:id',adminController.viewAJobController)

// http://localhost:3000/viewjob/5/removeJob
router.delete('/viewjob/:id/remove',jwtMiddleware,adminController.removeJobController)

// http://localhost:3000/savejob
// router.post('/savejob',jwtUserMiddleware,userController.savedJobsController)

router.post('/viewjob/:id/savejob',jwtUserMiddleware,userController.savedJobsController)

router.get('/savedjob',jwtUserMiddleware,userController.getSavedJobsController)

router.post('/viewjob/:id/applyjob',jwtUserMiddleware,userController.applyJobController)


module.exports = router