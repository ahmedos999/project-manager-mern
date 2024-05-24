const Task = require('../models/taskModel')

// const mongoose =  require('mongoose')


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

module.exports = {
    createTask,
    getTasks
}