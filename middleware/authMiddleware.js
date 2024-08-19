const User  = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const expressAsyncHandler = require("express-async-handler")

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
         token = req.headers.authorization.split(" ")[1]
         try{
            if(token){
                const decoded = jwt.verify(token,mysecret)
                const user = await User.findById(decoded?.id)
                req.user = user
                next()
            }

         }
         catch (error){
            throw new Error( "not authorized token expired , Please Login again")
         }
    } else{
        throw new Error('There is no token attached ti header')
    }
}
)
const isAdmin = asyncHandler(async (req,res,next)=>{
    const {email} = req.user;

})
module.exports = {authMiddleware , isAdmin}