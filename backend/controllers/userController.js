const mongoose =  require('mongoose')

const User = require('../models/userModel')

const loginUser = async(req,res)=>{
    const {email,password} = req.body 

    try{
        await User.login(email,password)
        res.status(200).json({email,password})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const signupUser = async(req,res)=>{
    const {email,password} = req.body

    try{
        await User.login(email,password)
        res.status(200).json({email,password})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {loginUser,signupUser}