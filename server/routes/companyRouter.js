const express=require('express');
const authCompanyController=require('../controllers/authCompanyController')
const companyController=require('../controllers/companyController')
const employeeController=require('../controllers/employeeController')
const router=express.Router();

router.post('/signUp',authCompanyController.uploadPhoto,authCompanyController.register);
router.post('/login',authCompanyController.login);
router.post('/forgetPassword',authCompanyController.forgetPassword)
router.post('/verifyOTP',authCompanyController.verifyEmailOtp)


// Protect middlewares
router.use(authCompanyController.protect);

router.post('/createEmployee',companyController.createEmployee);
router.get('/logout',authCompanyController.logOut);
router.get('/myProfile',companyController.myProfile);
router.get('/getMyNotes',companyController.getMyNotes);
router.patch('/updateMe',companyController.uploadUserPhoto,companyController.resizeCompanyPhoto,companyController.updateMe);
router.patch('/resetPassword',authCompanyController.resetPassword)
router.patch('/updateMyPassword',companyController.updateMyPassword)
router.delete('/deleteMe',companyController.deleteMe);

//control employees By Company
router.get('/getEmployees',employeeController.getEmployees);
router.get('/getOneEmployee/:id',employeeController.getOneEmployee);
router.patch('/updateEmployee/:id',employeeController.uploadUserPhoto,employeeController.resizeEmployeePhoto,employeeController.updateByCompanyOrAdmin);
router.patch('/resetEmployeePasswordByCompany/:id',employeeController.resetPasswordByCompanyOrAdmin)
router.delete('/deleteEmployee/:id',employeeController.deleteByCompanyOrAdmin);


// Admin Authorizations company
router.use(authCompanyController.restrictTo('admin'))
router.get('/getCompanies',companyController.getCompanys);
router.get('/getOneCompany/:id',companyController.getOneCompany)
router.delete('/deleteByAdmin/:id',companyController.deleteCompanyByAdmin);
router.patch('/updateByAdmin/:id',companyController.uploadUserPhoto,companyController.resizeCompanyPhoto,companyController.updateCompanyByAdmin);
router.patch('/resetCompanyPassword/:id',companyController.resetCompanyPassword)
router.post('/createCompany',companyController.createCompany);

// Admin Authorizations employees
router.get('/getEmployeesByAdmin/:id',employeeController.getEmployeesByAdmin)
router.get('/getOneEmployeeByAdmin/:id',employeeController.getOneEmployeeByAdmin)
router.patch('/resetEmployeePasswordByAdmin/:id',employeeController.resetPasswordByCompanyOrAdmin)
router.patch('/updateEmployeeByAdmin/:id',employeeController.uploadUserPhoto,employeeController.resizeEmployeePhoto,employeeController.updateByCompanyOrAdmin);
router.delete('/deleteEmployeeByAdmin/:id',employeeController.deleteByCompanyOrAdmin);


module.exports=router;