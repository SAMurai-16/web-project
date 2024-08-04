const express = require("express")
const User  = require("../models/user")
const {handleUserLogin,handleUserSignup} = require("../controllers/user")
const router = express.Router();

router.post("/", handleUserSignup)
router.post("/logins",handleUserLogin)
 module.exports = router;
