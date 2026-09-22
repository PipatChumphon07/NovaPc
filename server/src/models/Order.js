const mongoose=require("mongoose");
const orderItemSchema=new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
  name:String,price:Number,qty:Number,subtotal:Number
},{_id:false});
const orderSchema=new mongoose.Schema({
  customerId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer"},
  employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  items:[orderItemSchema],
  total:Number,
  status:{type:String,enum:["pending","paid","cancelled"],default:"pending"}
},{timestamps:true});
module.exports=mongoose.model("Order",orderSchema);