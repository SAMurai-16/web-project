const express = require("express");
const router = express.Router();
const { CreateUser , loginUserCtrl} = require("../controllers/userCtrl");
const {handleRefreshToken,logout} = require("../controllers/userCtrl")



router.post('/register', CreateUser);
router.post('/login',loginUserCtrl)
router.get('/refresh',handleRefreshToken)
router.get("/logout",logout)

module.exports = router;
 