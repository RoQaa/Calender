const express=require('express');
const authController=require('../controllers/authController')
const userController=require('../controllers/userController')
const router=express.Router();

router.post('/signUp',authController.uploadUserPhoto,authController.SignUp);
router.post('/login',authController.login);


// Protect middlewares
router.use(authController.protect);
router.get('/logout',authController.logOut);

// Admin Authorizations



module.exports=router;