const express = require('express')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const savedJobController = require('../controllers/savedJobController')
const applyJobController = require('../controllers/applyJobController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const jwtUserMiddleware = require('../middlewares/jwtUserMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()


// const savedJobController = require('../controllers/savedJobController')

//register- http://localhost:3000/register
router.post('/register',userController.registerController)

//login- http://localhost:3000/login
router.post('/login',userController.loginController)

// http://localhost:3000/adminlogin
// router.post('/adminlogin',adminController.adminLoginController)

//http://localhost:3000/userprofile
router.get('/userProfile',jwtUserMiddleware,userController.userDetailsController)

//http://localhost:3000/userprofile/edit
router.put('/userProfile/edit',jwtUserMiddleware,multerMiddleware.single('resumeFile'),userController.editProfileController)

 // http://localhost:3000/postjob
 router.post('/postjob',jwtMiddleware,adminController.postJobController)
 

//  http://localhost:3000/viewjob
router.get('/viewjob',adminController.viewAllJobController)

// http://localhost:3000/viewjob/:id/viewAjob
router.get('/viewjob/:id',adminController.viewAJobController)

// http://localhost:3000/viewjob/5/removeJob
router.delete('/viewjob/:id/remove',jwtMiddleware,adminController.removeJobController)

// http://localhost:3000/viewjob/5/editJob
router.put('/viewjob/:id/edit',jwtMiddleware,adminController.editAJobController)

// http://localhost:3000/savejob
// router.post('/viewjob/:id/savejob',jwtUserMiddleware,userController.savedJobsController)
router.post('/viewjob/:id/savejob',jwtUserMiddleware,savedJobController.savedJobsController)

//  get saved jobs
// router.get('/savedjob',jwtUserMiddleware,userController.getSavedJobsController)
router.get('/savedjob',jwtUserMiddleware,savedJobController.getSavedJobsController)

// remove saved job
// router.delete('/savedjob/:id/remove',jwtUserMiddleware,userController.removeSavedJobController)
router.delete('/savedjob/:id/remove',jwtUserMiddleware,savedJobController.removeSavedJobController)


// apply job
// router.post('/viewjob/:id/applyjob',jwtUserMiddleware,multerMiddleware.single('resumeFile'),userController.applyJobController)
router.post('/viewjob/:id',jwtUserMiddleware,multerMiddleware.single('resumeFile'),applyJobController.applyJobsController)

// get appliedjobs
// router.get('/appliedjob',jwtUserMiddleware,userController.getAppliedJobsController)
router.get('/appliedjob',jwtUserMiddleware,applyJobController.getAppliedJobsController)

// remove applied jobs
router.delete('/appliedjob/:id/remove',jwtUserMiddleware,applyJobController.removeAppliedJobsController)

// get all user appliedjobs to admin
router.get('/viewjob/:id/viewApplication',jwtMiddleware,adminController.getAppliedJobsController)

// remove user application
router.delete('/viewjob/:id/viewApplication/:applicationId/remove',jwtMiddleware,adminController.removeApplicationConttoller)

// update status api
router.put('/viewjob/:id/viewApplication/:applicationId/status',jwtMiddleware,adminController.updateJobStatusController);

module.exports = router