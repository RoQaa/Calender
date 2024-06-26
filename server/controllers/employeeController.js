const fs=require('fs');
const multer = require('multer')
const sharp = require('sharp');
const Employee = require('../models/employeeModel');
const Task=require('../models/taskModel')
const authFactory=require('../utils/authFactory');
const {catchAsync}=require('../utils/catchAsync');
const AppError=require('../utils/AppError');



const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

//TODO: Server path for Photos
const multerFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const multerStorage = multer.memoryStorage();



const upload = multer({
    storage: multerStorage,
    // limits: { fileSize: 2000000 /* bytes */ },
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('profileImage');
exports.resizeEmployeePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public\\img\\users\\${req.file.filename}`);

    next();
});


//Company
exports.getEmployees=catchAsync(async(req,res,next)=>{

    const data = await Employee.find({company:req.user.id});
    if(!data){
        return next(new AppError(`No data`,404))
    }
    res.status(200).json({
        status:true,
        length:data.length,
        data
    })

})
exports.getOneEmployee=catchAsync(async (req,res,next)=>{
    const data = await Employee.findById(req.params.id)
    if(!data){
        return next(new AppError(`No data`,404))
    }

    if(data.company.toString()!==req.user.id){
        return next(new AppError(`this employee doesn't belongs to you`,400))
    }
    res.status(200).json({
        status:true,
        data
    })
})

//Employee
exports.updateMyPassword=authFactory.updatePassword(Employee)
exports.updateMe=catchAsync(async(req,res,next)=>{
    const doc_id=req.user.id


    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }
    const filteredBody = filterObj(req.body, 'name');
    const employee =await Employee.findById(doc_id);
    if(!employee){    return next(new AppError(`employee not found`,404))}


    if (req.file) {
        fs.unlink(`${process.env.IMAGEPATH}${employee.profileImage}`, (err) => {
            if(err){
                console.log("File from update me in emp controller error")
            }
        });

        filteredBody.profileImage = `${process.env.IMAGEPATH}${req.file.filename}`;
    }
    Object.assign(employee, filteredBody); // Assuming `updateData` contains fields to update
    await employee.save({ validateBeforeSave: false });

    res.status(200).json({
        status:true,
        message:`Successfully updated`,
       // employee
    })
})
exports.deleteMe=catchAsync(async (req,res,next)=>{
    const employeeId=req.user.id
    const emp = await Employee.findById(employeeId);

    fs.unlink(`${process.env.IMAGEPATH}${emp.profileImage}`, (err) => {});
    const empTasks=await Task.find({employee:employeeId})
    await Promise.all(
        empTasks.map(async (task) => {
            // Remove the employee ID from the employee array
            task.employee.pull(employeeId);

            // Save the updated task
            await task.save();
        })
    )
    await  emp.remove();

    res.status(200).json({
        status:true,
        message:`Successfully deleted company`,
    })
})
exports.myProfile=catchAsync(async (req,res,next)=>{
    const data = await Employee.findById(req.user.id);
    if(!data){
        return next(new AppError(`No data`,404))
    }
    res.status(200).json({
        status:true,
        data
    })

})

//admin
exports.getEmployeesByAdmin=catchAsync(async(req,res,next)=>{
    const data = await Employee.find({company:req.params.id});
    if(!data){
        return next(new AppError(`No data`,404))
    }
    res.status(200).json({
        status:true,
        length:data.length,
        data
    })

})
exports.getOneEmployeeByAdmin=catchAsync(async(req,res,next)=>{
    const data = await Employee.findById(req.params.id)
    if(!data){
        return next(new AppError(`No data`,404))
    }

    res.status(200).json({
        status:true,
        data
    })
})


//Admin and Company
exports.updateByCompanyOrAdmin=catchAsync(async (req,res,next)=>{
    const doc_id=req.params.id


    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }
    const filteredBody = filterObj(req.body, 'name','isActive','NumberPhone');
    const employee =await Employee.findById(doc_id);
    if(!employee){    return next(new AppError(`employee not found`,404))}
    if(req.user.role!=='admin'){if(employee.company.toString()!==req.user.id){ return next(new AppError(`this employee doesn't belongs to you`,400))}}


    if (req.file) {
        fs.unlink(`${process.env.IMAGEPATH}${employee.profileImage}`, (err) => {});
        filteredBody.profileImage = `${process.env.IMAGEPATH}${req.file.filename}`;
    }
    Object.assign(employee, filteredBody); // Assuming `updateData` contains fields to update
    await employee.save({ validateBeforeSave: false });

    res.status(200).json({
        status:true,
        message:`Successfully updated Employee`,
         data:employee
    })
})

exports.deleteByCompanyOrAdmin=catchAsync(async (req,res,next)=>{
    const employeeId=req.params.id
    const emp = await Employee.findById(employeeId);
    if(req.user.role!=='admin') {
        if (emp.company.toString() !== req.user.id) {
            return next(new AppError(`that employee not belongs to you`, 400))
        }
    }
    fs.unlink(`${process.env.IMAGEPATH}${emp.profileImage}`, (err) => {});

    const empTasks=await Task.find({employee:employeeId})
    await Promise.all(
        empTasks.map(async (task) => {
            // Remove the employee ID from the employee array
            task.employee.pull(employeeId);

            // Save the updated task
            await task.save();
        })
    )

    await  emp.remove();

    res.status(200).json({
        status:true,
        message:`Successfully deleted Employee`,
    })
})
exports.resetPasswordByCompanyOrAdmin=catchAsync(async (req,res,next)=>{
    const employee = await Employee.findById(req.params.id);
    const company=employee.company.toString();
    if (!employee) {
        return next(new AppError('Employee not found', 400));
    }
    //protect
    if(req.user.role!=='admin'){
        if(company!==req.user.id){
            return next(new AppError(`you don't have permission to do this action or something Wrong`,400))
        }
    }


    employee.password = req.body.password;
    employee.passwordConfirm = req.body.passwordConfirm;
    employee.passwordOtp = undefined;
    employee.passwordOtpExpires = undefined;

    await employee.save();
    res.status(200).json({
        status:true,
        message:"password reset Successfully"
    })

})
