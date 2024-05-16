const mongoose=require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const otpGenerator = require('otp-generator');

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter your Company Name'] ,
       // unique:[true,"there's a Company with that name "],
        //trim:true
    },
    about:{
        type:String,
        //required:[true,'Please Enter your Company Name'] ,
        // unique:[true,"there's a Company with that name "],
        //trim:true
    },
    email:{
        type:String,
        required:[true,'Please Enter your Email'] ,
        unique:[true,"this Email used Before"],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a correct email'],
    },
    role:{
        type:String,
        enum:['admin','company'],
        default:'company'
    },
    password: {
        type: String,
        required: [true, 'Please Enter your Password'],
        trim: true,
        minlength: [8, ' Password At least has 8 charachters'],
        select: false, // make it invisible when get all Companys
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please Enter your Confirm Password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function (el) {
            return el === this.password;
          },
          message: 'Passwords are not the same',
        },
      },
    //TODO: default path for image
      profileImage:{
        type:String,

      },
      isActive:{
        type:Boolean,
        default:true
      },
      NumberPhone:{
        type:String,
        required:[true,"Number Phone required"],
        unique:[true,"this number phone used before"]
      },

      passwordChangedAt: Date,
      passwordOtp: String,
      passwordOtpExpires: Date,
}, )

  companySchema.index({ name: 'text', email: 'text' });
  // DOCUMENT MIDDLEWARE
  companySchema.pre('save', async function (next) {
    //only run if password modified
    if (!this.isModified('password')) {
      return next();
    }
    //hash password
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  
    next();
  });
  companySchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });
  

/*
  companySchema.pre(/^find/, function (next) {
    this.find({ isActive: { $ne: false } }).select('-createdAt -rating');
    next();
  });
 */ 


  //instance method check password login
companySchema.methods.correctPassword = async function (
    candidatePassword,
    CompanyPassword
  ) {
    return await bcrypt.compare(candidatePassword, CompanyPassword); // compare bt3mal hash le candidate we btcompare b3deha
  };

  
companySchema.methods.changesPasswordAfter = function (JWTTimestamps) {
    if (this.passwordChangedAt) {
      const changedTimestamps = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      ); //=> 10 min
      //console.log(changedTimestamps,JWTTimestamps);
      return JWTTimestamps < changedTimestamps;
    }
    return false;
  };



  companySchema.methods.generateOtp = async function () {
    const OTP = otpGenerator.generate(process.env.OTP_LENGTH, {
      upperCaseAlphabets: true,
      specialChars: false,
    });
    this.passwordOtp = crypto.createHash('sha256').update(OTP).digest('hex');
    this.passwordOtpExpires = Date.now() + 10 * 60 * 1000;
    return OTP;
  };

  const Company = mongoose.model('Company',companySchema);
  module.exports=Company;