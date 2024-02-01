
const mongoose=require('mongoose')
let UserSchema=new mongoose.Schema({
  username:String,
  password:String
})

let UserModel=mongoose.model('Users',UserSchema)

module.exports= UserModel