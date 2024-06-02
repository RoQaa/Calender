const fs=require('fs');
const multer = require('multer')
const sharp = require('sharp');
const Company=require('../models/companyModel');
const Employee = require("../models/employeeModel");
const Task=require('../models/taskModel')
const Notification=require('../models/notificationModel')
const {catchAsync}=require('../utils/catchAsync');
const AppError=require('../utils/AppError');
const authFactory = require("../utils/authFactory");

//TODO: Test Admin Routes

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
exports.resizeCompanyPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public\\img\\users\\${req.file.filename}`);

    next();
});

//Admin
exports.getCompanys = catchAsync(async(req,res,next)=>{
    const data= await Company.find({role:'company'});
    if(!data){
        return next(new AppError('No Data',404));
    }
    res.status(200).json({
        status:true,
        length:data.length,
        data
    })
})
exports.getOneCompany=catchAsync(async (req,res,next)=>{
    const data=await Company.findById(req.params.id);
    if(!data){
        return next(new AppError('Company not Found',404));
    }
    res.status(200).json({
        status:true,
        data
    })
})
exports.deleteCompanyByAdmin=catchAsync(async (req,res,next)=>{
    const companyId=req.params.id
    const company = await Company.findById(companyId);

    fs.unlink(`C:\\Users\\RoQa\\Desktop\\Work\\Calender\\server\\public\\img\\users\\${company.profileImage}`, (err) => {
        if(err){
            console.log("Error:delete image ")
        }
    });
    await Employee.deleteMany({ company: companyId });
    await Task.deleteMany({ company: companyId});
    await Notification.deleteMany({to:companyId})
    await  company.remove();

    res.status(200).json({
        status:true,
        message:`Successfully deleted company`,
    })
})
exports.updateCompanyByAdmin=catchAsync(async (req,res,next)=>{
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }
    const filteredBody = filterObj(req.body, 'name');
    const company =await Company.findById(req.params.id);
    if(!company){    return next(new AppError(`company not found`,404))}


    if (req.file) {
        fs.unlink(`C:\\Users\\RoQa\\Desktop\\Work\\Calender\\server\\public\\img\\users\\${company.profileImage}`, (err) => {});

        filteredBody.profileImage = req.file.filename;
    }
    Object.assign(company, filteredBody); // Assuming `updateData` contains fields to update
    await company.save({ validateBeforeSave: false });

    res.status(200).json({
        status:true,
        message:`Successfully updated company`,
        company
    })
})
exports.createCompany=catchAsync(async (req,res,next)=>{
    const comp = await Company.create(req.body);
    res.status(200).json({
        status:true,
        message:`Successfully created company`,
    })
})
exports.resetCompanyPassword=catchAsync(async(req,res,next)=>{
    const company=await Company.findById(req.params.id);
    if(!company){
        return next(new AppError(`no company Found`),404)
    }
    company.password = req.body.password;
    company.passwordConfirm = req.body.passwordConfirm;
    company.passwordOtp = undefined;
    company.passwordOtpExpires = undefined;

    await company.save({ validateBeforeSave: true });
    res.status(200).json({
        status:true,
        message:"Successfully reset Password"
    })
})

//Protect
exports.updateMyPassword=authFactory.updatePassword(Company)
exports.createEmployee=  catchAsync(async (req, res, next) => {
  req.body.company=req.user.id

    const employee = new Employee(req.body);
    const id = employee._id.toString();


    if (!employee) {
        return next(new AppError(`SomeThing Error cannot sign up`, 404));
    }

    if (req.file) {
        req.file.filename = `user-${id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public\\img\\users\\${req.file.filename}`);
        employee.profileImage = `${req.file.filename}`;
    }

    await employee.save();


    res.status(201).json({
        status:true,
        message:"Employee Created Successfully"
    })


});
exports.myProfile=catchAsync(async (req,res,next)=>{

    const data = req.user
    if(!data){
        return next(new AppError(`No data`,404))
    }
    res.status(200).json({
        status:true,
        data
    })

})

exports.updateMe=catchAsync(async (req,res,next)=>{
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }
    const filteredBody = filterObj(req.body, 'name','about');
    const company =await Company.findById(req.user.id);
    if(!company){    return next(new AppError(`company not found`,404))}


    if (req.file) {
        fs.unlink(`C:\\Users\\RoQa\\Desktop\\Work\\Calender\\server\\public\\img\\users\\${company.profileImage}`, (err) => {});

        filteredBody.profileImage = req.file.filename;
    }
    Object.assign(company, filteredBody); // Assuming `updateData` contains fields to update
    await company.save({ validateBeforeSave: false });

    res.status(200).json({
        status:true,
        message:`Successfully updated company`,
        company
    })
})
exports.deleteMe=catchAsync(async (req,res,next)=>{
    const companyId=req.user.id
    const company = await Company.findById(companyId);

    fs.unlink(`C:\\Users\\RoQa\\Desktop\\Work\\Calender\\server\\public\\img\\users\\${company.profileImage}`, (err) => {
        if(err){
            console.log("Error:delete image ")
        }
    });
    await Employee.deleteMany({ company: companyId });
    await Task.deleteMany({ company: companyId});
    await Notification.deleteMany({to:companyId})

    await  company.remove();

    res.status(200).json({
        status:true,
        message:`Successfully deleted company`,
    })

})

