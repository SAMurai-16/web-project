const jwt = require("jsonwebtoken")
const secret  = "nhibataunga"

function setUser(id,user){
    const payload = {
        _id: user._id,
        Email:user.Email,
    }
    return jwt.sign(payload, secret)
}

function getUser(token){
    return jwt.verify(token,secret)
}

module.exports={
    setUser,
    getUser
}