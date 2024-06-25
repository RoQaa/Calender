const mongoose=require('mongoose');
const notificationSchema=mongoose.Schema({
    from:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:[true,`notification must know from who`]
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:[true,`notification must know to who`]
    },
    description:{
        type:String,
        minLength:[1,"min desc is at least 1 characters long"],
        required:[true,'Please enter description'],
    }
},{
    timestamps:true
})

notificationSchema.pre(/^find/,function (next){
    this.populate({
        path:'to',
        select:'email'
    }).sort('-createdAt')
    next();
})

const Notification=mongoose.model('Notification',notificationSchema);

module.exports=Notification;