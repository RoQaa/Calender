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
        minLength:[4,"min desc is at least 4 characters long"],
        required:[true,'Please enter description'],
    }
})

notificationSchema.pre(/^find/,function (next){
    this.populate({
        path:'to',
        select:'email'
    })
    next();
})

const Notification=mongoose.model('Notification',notificationSchema);

module.exports=Notification;