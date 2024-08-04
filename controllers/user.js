const User = require("../models/user")
const {setUser} = require("../service/auth")

async function handleUserSignup(req,res){
    const {UserName , Email , Password} = req.body;
    await User.create({
        UserName,
        Email,
        Password,
    })

    return res.render("home");
}

async function handleUserLogin(req,res){
    const {Email,Password}  = req.body
    const user  = await User.findOne({Email,Password})
    console.log("User",user)


    if(!user){
        return res.render("login",{error:"Invalid Username or Password"})
    }
    const token = setUser(user);
    res.cookie("uid",token)
     return res.render("home")
    
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
  };