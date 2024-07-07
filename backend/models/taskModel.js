const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
    participants:{
        type:[String],
        required:false
    },
    status:{
        type:String,
        require:true
    }
},{timestamps:true}) 

module.exports = mongoose.model('Tasks',tasksSchema)