const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = Schema({
    user_id:{
        type:String,
        required:true
    },
    project:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
    owner:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{timestamps:true}) 

module.exports = mongoose.model('Notification',tasksSchema)