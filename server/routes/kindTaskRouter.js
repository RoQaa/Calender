const express=require('express')
const authCompanyController = require('../controllers/authCompanyController');
const kindTaskController=require('../controllers/kindTaskController')

const router=express.Router();

router.get('/getTaskType',kindTaskController.getKindTask)
router.get('/getOneTaskType/:id',kindTaskController.getOneKindTask)

router.use(authCompanyController.protect)
router.use(authCompanyController.restrictTo('admin'))

router.post('/createTaskType',kindTaskController.createKindTask)
router.patch('/updateTaskType/:id',kindTaskController.updateKindTask)
router.delete('/deleteTaskType/:id',kindTaskController.deleteKindTask)

module.exports=router;