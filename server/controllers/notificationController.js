const Notification=require('../models/notificationModel')
const io =require('../utils/socket')
const {catchAsync} = require("../utils/catchAsync");
const AppError=require('../utils/appError')




exports.createNotification = catchAsync(async (req, res, next) => {
    // Protect token
    req.body.from = req.user.id;

    // Create notification
    const note = await Notification.create(req.body);

    // Emit socket event
    io.getIo().emit('Notification', { action: 'created', note: note,admin:{name:req.user.name}});

    // Send response
    res.status(201).json({
        status: true,
        message: 'Notification Created successfully',
    });
});
exports.getNotifications=catchAsync(async(req,res,next)=>{
    const data =  await Notification.find()
    if(!data||data.length===0) return next(new AppError(`No data`,404));
    res.status(200).json({
        status:true,
        data
    })
})
exports.getOneNotifications=catchAsync(async(req,res,next)=>{
    const data =  await Notification.findById(req.params.id)
    if(!data) return next(new AppError(`No data`,404));
    res.status(200).json({
        status:true,
        data
    })
})
exports.updateNotification=catchAsync(async(req,res,next)=> {
    const note = await Notification.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if (!note) return next(new AppError(`No data`, 404));
    res.status(200).json({
        status: true,
        message: "Notification updated successfully",
       // note
    })
})
exports.deleteNotification=catchAsync(async(req,res,next)=> {
    const note = await Notification.findByIdAndDelete(req.params.id)
    if (!note) return next(new AppError(`No data`, 404));

    res.status(200).json({
        status: true,
        message: "Notification deleted successfully"

    })
})
