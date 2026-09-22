const mongoose=require("mongoose");
const paymentSchema=new mongoose.Schema({
  orderId:{type:mongoose.Schema.Types.ObjectId,ref:"Order",required:true},
  method:{type:String,enum:["cash","credit_card","promptpay"]},
  amount:Number,
  paidAt:Date
},{timestamps:true});
module.exports=mongoose.model("Payment",paymentSchema);