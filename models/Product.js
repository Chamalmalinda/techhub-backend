import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
       productID : {
           type : String,
           requiured : true,
           unique : true
       },
       name : {
          type : String,
          required : true
       },
       altNames : {
           type : [String],
           default :[]
       },
       description : {
           type : String,
           required : true
       },
       price : {
           type : String,
           required : true
       },
       labelledPrice : {
           type : [String],
           required : true
       },
       images : {
           type :[String],
           required : true
       },
       category : {
           type : String ,
           required : true
       },
       model : {
           type : String,
           required : true,
           default :"Standard"
       },
       brand : {
           type : String,
           required : true,
           default : "no brand"
       },
       stock : {
           type : Number,
           required : true,
           default :0
       },
       isAvailable : {
           type : Boolean,
           default : true
       } 
    }  
)

const Product = mongoose.model("Product",productSchema)

export default Product;