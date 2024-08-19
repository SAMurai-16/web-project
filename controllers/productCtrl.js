const Product = require("../models/productModel")
const asynchandler = require("express-async-handler")

const createProduct = asynchandler(async(req,res)=>{
  try{
    const newProduct  = await Product.create(req.body)
    res.json(newProduct);

  }
  catch(error){throw new Error(error)}
})



module.exports={
    createProduct

}