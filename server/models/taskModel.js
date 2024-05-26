const mongoose =require('mongoose');
const taskSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter task name'],
    },
    description:{
        type:String,

    },
    dueDate: {
        type:Date,
     //   default:Date.now(),

    },
    kind:{
        type:mongoose.Schema.ObjectId,
        ref:'KindTask',
        required:[true, 'Please enter kind task'],
    },

    priority: {
        type: Number,
        enum: [0,1,2],
        default: 1
    },
    employee:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Employee',
        required:[true, 'Please enter employee'],
    }],
    company:{
        type:mongoose.Schema.ObjectId,
        ref: 'Company',
        required:[true, 'Please enter Company'],
    }



},{
    timestamps: true
});
//Todo:OPen populate for task
/*
taskSchema.pre("save",function (next){
    this.dueDate=new Date(this.dueDate + 3*60*60*1000)
    next();
})
*/

taskSchema.pre(/^find/,function (next){
    this.populate({
        path:'employee',
        select:'-__v -company',
    }).populate({path:'kind',select:'-__v'}).select('-__v')
    next();
})

const Task= mongoose.model("Task",taskSchema);

module.exports = Task;