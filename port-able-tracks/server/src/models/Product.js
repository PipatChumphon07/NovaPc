const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
  name:{type:String,required:true},
  categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
  brandId:{type:mongoose.Schema.Types.ObjectId,ref:"Brand",required:true},
  price:{type:Number,required:true},
  cost:{type:Number,required:true},
  barcode:{type:String,unique:true,sparse:true},
  image:String,
  specs:{chipset:String,vram:String,socket:String,capacity:String}
},{timestamps:true});
module.exports=mongoose.model("Product",productSchema);