const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  passwordHash:{type:String,required:true},
  name:String,
  role:{type:String,enum:["admin","employee"],default:"employee"}
},{timestamps:true});
module.exports=mongoose.model("User",userSchema);