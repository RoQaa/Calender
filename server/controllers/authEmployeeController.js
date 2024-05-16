
const Employee =require('../models/employeeModel')
const authFactory=require('../utils/authFactory')
const AppError = require("../utils/appError");


exports.uploadPhoto=authFactory.uploadUserPhoto
exports.login=authFactory.login(Employee)
exports.forgetPassword=authFactory.forgotPassword(Employee)
exports.verifyEmailOtp=authFactory.verifyEmailOtp(Employee);
exports.resetPassword=authFactory.resetPassword();
exports.protect=authFactory.protect(Employee)
exports.logOut=authFactory.logOut


