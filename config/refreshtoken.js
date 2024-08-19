const jwt  = require("jsonwebtoken")

const GenerateRefreshToken  = (id) =>{
    return jwt.sign({id},process.env.secret,{expiresIn: "3d"})
}

module.exports={GenerateRefreshToken}