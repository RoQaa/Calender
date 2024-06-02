const schedule = require('node-schedule');
const { format } = require('date-fns');
const Task = require('../models/taskModel');
const io = require('../utils/socket')
const {catchAsync} = require('../utils/catchAsync');
const AppError = require("../utils/appError");

//Company
exports.createTask = catchAsync(async (req,res,next)=>{
    req.body.company=req.user.id;

       const task = await Task.create(req.body)


 //   scheduleNotification(task)
        res.status(201).json({
            status:true,
            message: 'Task created successfully',
          //  data:task,

        });

})
exports.getEmployeeTasks=catchAsync(async (req,res,next)=>{
    const data = await Task.find({employee:req.params.id,company:req.user.id}).sort('-priority').select('-employee -company')
    if(!data){
        return next(new AppError('No data',404));
    }
    res.status(200).json({
        status:true,
        length:data.length,
        data
    })

})
exports.getOneTask=catchAsync(async (req,res,next)=>{
    const task = await  Task.findById(req.params.id);
    if(!task||task.company.toString()!==req.user.id){
        return next(new AppError('No task found',404));
    }
    res.status(200).json({
        status:true,
        data:task,
    })
})
exports.deleteTask=catchAsync(async (req,res,next)=>{
    const task = await Task.findById(req.params.id)
    if(task.company.toString()!==req.user.id){
        return next(new AppError(`this task not belongs to you`,400))
    }
   await task.remove();
    res.status(200).json({
        status:true,
        message:"task deleted Successfully"
    })
})
exports.updateTask=catchAsync(async (req,res,next)=>{
    const task = await Task.findById(req.params.id)
    if(task.company.toString()!==req.user.id){
        return next(new AppError(`this task not belongs to you`,400))
    }
    Object.assign(task,req.body)
    await task.save();
    res.status(200).json({
        status:true,
        message:"task Updated Successfully",
        task
    })
})
exports.getAllTasks=catchAsync(async (req,res,next)=>{
    const data = await Task.find({company:req.user.id}).sort('-priority').select('-employee -company')
    if(!data||data.length==0){
        return next(new AppError(`NO Data`,404));
    }
    res.status(200).json({
        status:true,
        length:data.length,
        data
    })
})

//Employee
exports.getMyTasks=catchAsync(async(req,res,next)=>{
    const tasks=await Task.find({employee:req.user.id}).sort('-priority')
    if(!tasks||tasks.length===0) return next(new AppError(`No tasks found`,404))
    res.status(200).json({
        status:true,
        length:tasks.length,
        tasks
    })
})
exports.getOneMyTask=catchAsync(async(req,res,next)=>{
    const task=await Task.findOne({_id:req.params.id,employee:req.user.id})

    if(!task) return next(new AppError(`No tasks found`,404))
    res.status(200).json({
        status:true,
        task
    })
})