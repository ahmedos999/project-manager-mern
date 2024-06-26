const Task = require('../models/taskModel')

const mongoose =  require('mongoose')


const getTasks = async(req,res)=>{
   const user_id = req.user._id
   const user_email = req.user.email
    const tasks =  await Task.find({$or:[
      {user_id:user_id},
      {participants: { $in: [user_email] }}
   ]}).sort({createdAt:-1});
   
   //  const tasks  =  await Task.find({user_id})
   //  const tasks =  await Task.find({user_id,participants: { $in: [user_id] }} ).sort({createdAt:-1})

    res.status(200).json(tasks)
}

const createTask = async(req,res)=>{
 const {title,category,description,participants,status} = req.body



 if( !title && !category && !description && !status){
    return res.status(400).json({error:'Please fill all fields'})
 }


 try{
    const user_id = req.user._id
    const task = await Task.create({title,category,description,user_id,participants,status})
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