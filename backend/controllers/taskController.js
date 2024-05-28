const Task = require('../models/taskModel')

const mongoose =  require('mongoose')


const getTasks = async(req,res)=>{
    const tasks =  await Task.find()

    res.status(200).json(tasks)
}

const createTask = async(req,res)=>{
 const {title,category,description} = req.body

 if( !title && !category && !description){
    return res.status(400).json({error:'Please fill all fields'})
 }


 try{
    const task = await Task.create({title,category,description})
    res.status(200).json(task)
 }catch(e){
    res.status(400).json({error:e.message})
 }
}

const deleteTask = async (req,res)=>{
   const {id} = req.params
   
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such Task"})
   }

   const task = await Task.findOneAndDelete({_id:id})

   if(!task){
      return res.status(400).json({error:'No such task'})
   }

   res.status(200).json(task)

}

module.exports = {
    createTask,
    getTasks,
    deleteTask
}