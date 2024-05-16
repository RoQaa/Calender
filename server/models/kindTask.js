const mongoose=require('mongoose')
const kindTaskSchema=mongoose.Schema({
    name:{
        type:String,
        unique:[true,"this task created Before"],
        require:[true,"Must Enter name of Type-Task"]
    }
})

kindTaskSchema.pre(/^find/,function(next){
    this.select('-__v')
    next();
})
const KindTask= mongoose.model('KindTask',kindTaskSchema)

module.exports=KindTask;