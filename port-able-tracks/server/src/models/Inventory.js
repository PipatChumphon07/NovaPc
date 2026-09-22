const mongoose=require("mongoose");
const inventorySchema=new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true,unique:true},
  quantity:{type:Number,default:0},
  location:String
},{timestamps:true});
module.exports=mongoose.model("Inventory",inventorySchema);