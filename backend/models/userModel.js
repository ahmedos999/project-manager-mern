const mongoose = require('mongoose')
const validator = require('validator')
const bcrpypt = require('bcrypt')

const Schema = mongoose.Schema 

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.static.signup = async function(email,password){
    const exisits = await this.findOne({email})

    if(!email || !password){
        throw Error('All field musr be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }

    if(exisits){
        throw Error('Email is alread in use')
    }

        const salt = await bcrpypt.genSalt(10)
        const hash = await bcrpypt.hash(password,salt)

        const user = await this.create({email,password:hash})

        return user
}
userSchema.static.login = async function(email,password){

    if(!email || !password){
        throw Error('Alll fields must be filled')
    }

    const user = this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrpypt.compare(password,user.password)

    if(match){
        throw Error('Incorrect password')
    }

    return user

}

module.exports = mongoose.model('User',userSchema)