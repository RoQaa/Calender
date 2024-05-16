const express=require("express");
const taskController = require('../controllers/taskController');
const authCompanyController = require('../controllers/authCompanyController');
const router=express.Router();


router.use(authCompanyController.protect)
router.use(authCompanyController.restrictTo('company'))
router.get('/getAllTasks',taskController.getAllTasks)
router.post('/createTask', taskController.createTask);
router.get('/getEmployeeTasks/:id', taskController.getEmployeeTasks);
router.get('/getOneTask/:id', taskController.getOneTask);
router.patch('/updateTask/:id', taskController.updateTask);
router.delete('/deleteTask/:id',taskController.deleteTask);


module.exports=router;