const multer=require('multer')
const sharp=require('sharp');
const User = require('../models/userModel')
const { catchAsync } = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);


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
  
  //resize midlleWare
  exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
  
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
  
    next();
  });


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

