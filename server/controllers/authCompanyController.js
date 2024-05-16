const Company =require('../models/companyModel')
const authFactory=require('../utils/authFactory')
const AppError = require("../utils/appError");


exports.uploadPhoto=authFactory.uploadUserPhoto
exports.register=authFactory.SignUp(Company);
exports.login=authFactory.login(Company)
exports.forgetPassword=authFactory.forgotPassword(Company)
exports.verifyEmailOtp=authFactory.verifyEmailOtp(Company)
exports.resetPassword=authFactory.resetPassword();
exports.protect=authFactory.protect(Company)
exports.logOut=authFactory.logOut

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to preform this action', 403)
            );
        }
        next();
    };
};