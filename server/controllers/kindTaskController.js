const KindTask=require('../models/kindTask')
const {catchAsync} = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createKindTask=catchAsync(async(req,res,next)=>{  //Just Admin Author
    const doc = await KindTask.create(req.body);

    res.status(201).json({
        status:true,
        message:"type of Task Create Successfully",
       data:doc
    })
})

exports.getKindTask=catchAsync(async (req,res,next)=>{
    const data = await KindTask.find();
    if(!data){
        return next(new AppError(`No Data`,404))
    }
    res.status(200).json({
        status:true,
        data
    })
})

exports.getOneKindTask=catchAsync(async (req,res,next)=>{
    const data = await KindTask.findById(req.params.id);
    if(!data){
        return next(new AppError(`No Data`,404))
    }
    res.status(200).json({
        status:true,
        data
    })
})

exports.updateKindTask=catchAsync(async (req,res,next)=>{
    const doc = await KindTask.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: true,
        message:"Type Updated Successfully",
       data:doc
    });
})

exports.deleteKindTask=catchAsync(async (req,res,next)=>{

        const doc = await KindTask.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: true,
            message:"Type of Task deleted Successfully"
        });
})
