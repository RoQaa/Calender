const express=require('express')
const notificationController=require('../controllers/notificationController')
const authCompanyController=require('../controllers/authCompanyController')
const router=express.Router();

router.use(authCompanyController.protect)
router.get('/getNotification',notificationController.getNotifications)
router.get('/getOneNotification/:id',notificationController.getOneNotifications)
router.use(authCompanyController.restrictTo('admin'))
router.post('/createNotification',notificationController.createNotification)
router.patch('/updateNotification/:id',notificationController.updateNotification)
router.delete('/deleteNotification/:id',notificationController.deleteNotification)




module.exports=router;