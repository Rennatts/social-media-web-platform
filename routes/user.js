const express = require("express");
const router = express.Router();
const userById  = require("../functions/authFunctions/userById");
const allUsers = require("./../functions/userFunction/allUsers");
const getUser = require("../functions/userFunction/getUser");
const requireSingin = require("../functions/authFunctions/requireSignin");
const updateUser = require("../functions/userFunction/updateUser");
const deleteUser = require("./../functions/userFunction/deleteUser");
//const userPhoto = require("./../functions/userFunction/userPhoto");
const addFollowing = require('./../functions/userFunction/addFollowing');
const addFollower = require('./../functions/userFunction/addFollower');
const removeFollowing = require('./../functions/userFunction/removeFollowing');
const removeFollower = require('./../functions/userFunction/removeFollower');
const getFollowers = require('./../functions/userFunction/getFollowers');
const userAuthentication = require("../helpers/userAuthentication");


const multer = require("multer");
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const multerConfig = require('./../multer');



//follow and unfollow
router.put("/user/follow", requireSingin, addFollowing, addFollower);
router.put("/user/unfollow", requireSingin, removeFollowing, removeFollower);



router.get("/allusers", allUsers);
router.get("/user/:userId", requireSingin, getUser);
router.put("/user/:userId", requireSingin, multer(multerConfig).single("file"), updateUser);
router.delete("/user/:userId", requireSingin, deleteUser);


router.get("/user/followers/:userId", requireSingin, getFollowers);





//photo
//router.get("/user/photo/:userId", userPhoto);


//any route containing :userId, our app will first execute userById()
router.param("userId", userById);



module.exports = router;