const jwt  = require("jsonwebtoken")
const secret  = "mysecret"
const GenerateToken  = (id) =>{
    return jwt.sign({id},secret,{expiresIn: "3d"})
}

module.exports={GenerateToken}