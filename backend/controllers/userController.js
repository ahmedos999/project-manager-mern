const mongoose =  require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel') 

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body 

    try{
       const user =  await User.login(email,password)

        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const signupUser = async(req,res)=>{
    const {email,password} = req.body

    try{
        const user  = await User.signup(email,password)

        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getallusers = async(req,res)=>{
    try{
        const allUsers = await User.find().select('email')
        // console.log(allUsers)
        if(allUsers){
            res.status(200).json(allUsers)
        }
    }catch(e){
        res.status(400).json({error:'something went wrong'})
    }
 }
module.exports = {loginUser,signupUser,getallusers}