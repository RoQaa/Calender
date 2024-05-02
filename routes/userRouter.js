const express=require('express');
const authController=require('../controllers/authController')
const router=express.Router();

router.post('/signUp',authController.SignUp);
router.post('/login',authController.login);


// Protect middlewares
router.use(authController.protect);
router.get('/logout',authController.logOut);




module.exports=router;