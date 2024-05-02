const User = require('../models/userModel')
const { catchAsync } = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);





exports.getUsers=catchAsync(async(req,res,next)=>{
    const users= await User.find();
    if(!users){
        return next(new AppError(`No Users`,404))
    }
    res.status(200).json({
        status:true,
        length:users.length,
        data:users
    })
})

