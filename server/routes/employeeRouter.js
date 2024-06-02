const express=require('express');
const authEmployeeController=require('../controllers/authEmployeeController')
const employeeController=require('../controllers/employeeController')
const taskController=require('../controllers/taskController')

const router=express.Router();


router.post('/login',authEmployeeController.login);
router.post('/forgetPassword',authEmployeeController.forgetPassword)
router.post('/verifyOTP',authEmployeeController.verifyEmailOtp)


// Protect middlewares
router.use(authEmployeeController.protect);
router.get('/getMyTasks',taskController.getMyTasks)
router.get('/getOneMyTask/:id',taskController.getOneMyTask)
router.get('/myProfile',employeeController.myProfile);
router.get('/logout',authEmployeeController.logOut);
router.patch('/updateMe',employeeController.uploadUserPhoto,employeeController.resizeEmployeePhoto,employeeController.updateMe)
router.patch('/resetPassword',authEmployeeController.resetPassword)
router.delete('/deleteMe',employeeController.deleteMe);



module.exports=router;