const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true}) 

module.exports = mongoose.model('Tasks',tasksSchema)