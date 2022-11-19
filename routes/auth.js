const express = require("express");
const router = express.Router();
const signup   = require('../functions/authFunctions/signup');
const { userSignupValidator } = require("./../helpers/index");
const signin  = require("../functions/authFunctions/signin");
const signout  = require("../functions/authFunctions/signout");
const userById  = require("../functions/authFunctions/userById");


router.post("/signup", userSignupValidator, signup);

router.post("/signin", signin);

//signout
router.get("/signout", signout);


//any route containing :userId, our app will first execute userById()
router.param("userId", userById);




module.exports = router;