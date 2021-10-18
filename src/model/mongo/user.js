const mongoose = require('mongoose')

const schema = mongoose.Schema;

const User = new schema({
  nama : {type:String, required:true}, 
  phone : {type:String, required:true}, 
  email : {type:String, required:true},  
  password : {type:String, required:true}
}, 
{timestamps: true})

module.exports = mongoose.model("user", User)
