const { GenerateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asynchandler = require("express-async-handler")
const {GenerateRefreshToken} = require("../config/refreshtoken")
const jwt = require("jsonwebtoken")



const CreateUser = asynchandler(async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, password } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({
                msg: "Email is required",
                success: false,
            });
        }

        // Check if user already exists
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            // Create a new user
            const newUser = await User.create({
                firstname,
                lastname,
                email,
                mobile,
                password,
                role,
            });
            return res.json(newUser);
        } else {
            // User already exists
            return res.status(400).json({
                msg: "User Already Exists",
                success: false,
            });
        }
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            msg: "An error occurred",
            success: false,
            error: error.message,
        });
    }
});

//loging in the user

const loginUserCtrl = asynchandler(async (req,res)=> {
    const {email,password} = req.body;
    //check if user exirs
    const findUser  = await User.findOne({email})
    if (findUser && await findUser.isPasswordMatched(password) ){
    const RefreshToken = await GenerateRefreshToken(findUser?._id)

    const updateuser = await User.findByIdAndUpdate(findUser.id , {RefreshToken:RefreshToken},
        {new:true}
    )
    res.cookie('RefreshToken',RefreshToken,{
        httpOnly:true,
        maxAge: 72*60*60*1000,
    }

    )
        res.json({
            _id : findUser?._id,
            firstname:findUser?.firstname,
            lastname: findUser?.lastname,
            email : findUser?.email,
            mobile : findUser?.mobile,
            password : findUser?.password,
            token: GenerateToken(findUser?._id)


    })

    }
    else{
        throw new Error ("Invalid Credentials")
    }

})


//logout functionality
const logout = asynchandler(async (req,res)=>{
    const cookie = req.cookies
    if(!cookie?.RefreshToken) throw new Error('no refresh token found')
  const RefreshToken  = cookie.RefreshToken;
    const user = await User.findOne({ RefreshToken })
    if(!user){
        res.clearCookie('RefreshToken',{
            httpOnly:true,
            secure:true,

        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({RefreshToken},{
        RefreshToken: " ",
    })
    res.clearCookie('RefreshToken',{
        httpOnly:true,
        secure:true,
    })

    res.sendStatus(204)
})



//handling refrrsh token
const handleRefreshToken   = asynchandler(async (req,res)=>{
    const cookie = req.cookies
    console.log(cookie)
    if(!cookie?.RefreshToken) throw new Error('no refresh token found')
    const RefreshToken  = cookie.RefreshToken;
    console.log(RefreshToken)
    const user = await User.findOne({ RefreshToken })
    if(!user) throw new Error("No refresh token present in db or not matched")
    jwt.verify(
RefreshToken, process.env.secret , (err,decoded)=>{
    if(err || user.id !== decoded.id){
        throw new Error('there is something wrong wiht refresh token')
    }
    const accessToken = GenerateToken(user?._id)
    res.json({accessToken})
})
})


module.exports = { CreateUser  , loginUserCtrl , handleRefreshToken, logout};
 