const express=require('express');
const authEmployeeController=require('../controllers/authEmployeeController')
const employeeController=require('../controllers/employeeController')
const authCompanyController = require("../controllers/authCompanyController");

const router=express.Router();


router.post('/login',authEmployeeController.login);
router.post('/forgetPassword',authEmployeeController.forgetPassword)
router.post('/verifyOTP',authEmployeeController.verifyEmailOtp)


// Protect middlewares
router.use(authEmployeeController.protect);
router.get('/myProfile',employeeController.myProfile);
router.get('/logout',authEmployeeController.logOut);
router.patch('/updateMe',employeeController.uploadUserPhoto,employeeController.resizeEmployeePhoto,employeeController.updateMe)
router.patch('/resetPassword',authEmployeeController.resetPassword)
router.delete('/deleteMe',employeeController.deleteMe);



module.exports=router;