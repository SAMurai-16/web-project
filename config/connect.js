const mongoose = require("mongoose")
const dbConnect  = ()=>{
  try{
  const conn  = mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")
  console.log("Database Conneected Successfully")
}
 catch(error){
  console.log("Database Error")
 }
}


module.exports = {
  dbConnect
}