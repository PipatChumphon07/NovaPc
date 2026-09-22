const mongoose=require("mongoose");
const poItemSchema=new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
  qty:Number,cost:Number
},{_id:false});
const purchaseOrderSchema=new mongoose.Schema({
  supplierId:{type:mongoose.Schema.Types.ObjectId,ref:"Supplier",required:true},
  items:[poItemSchema],
  status:{type:String,enum:["pending","received"],default:"pending"}
},{timestamps:true});
module.exports=mongoose.model("PurchaseOrder",purchaseOrderSchema);