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
 const {title,categories,description,participants,status,user_email} = req.body

 console.log(participants)



 if( !title && !categories && !description && !status && !user_email){
    return res.status(400).json({error:'Please fill all fields'})
 }


 try{
    const user_id = req.user._id
    const task = await Task.create({title,categories,description,user_id,user_email,participants,status})
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

const updateTask = async(req,res)=>{
   const {id} = req.params
   const {status} = req.body

   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such Task"})
   }
   if(!status){
      return res.status(400).json({error:'No body found'})
   }

    const task = await Task.updateOne({_id:id},{status:status})

    if(!task){
      return res.status(400).json({error:'No such task'})
   }

   res.status(200).json(task)

}

module.exports = {
    createTask,
    getTasks,
    deleteTask,
    updateTask
}