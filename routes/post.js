const express = require("express");
const router = express.Router();
const { createPostValidator } = require("./../helpers/index");
const createPost = require('./../functions/postFunctions/createPost');
const getPosts = require('./../functions/postFunctions/getPosts');
const requireSignin = require('./../functions/authFunctions/requireSignin');
const userById  = require("../functions/authFunctions/userById");
const postsByUser = require("../functions/postFunctions/postsByUser");
const postById = require("../functions/postFunctions/postById");
const isPoster = require("../functions/postFunctions/isPoster");
const deletePost = require("../functions/postFunctions/deletePost");
const likePost = require("../functions/postFunctions/likePost");
const unlikePost = require("../functions/postFunctions/unlikePost");
const addComment = require("../functions/postFunctions/addComment");
const deleteComment = require("../functions/postFunctions/deleteComment");
const postPhoto = require('../functions/postFunctions/postPhoto');
const searchForPosts = require("../functions/postFunctions/searchForPosts");
const getMostCommented = require("../functions/postFunctions/getMostCommented");
const getMostLikedPosts = require("../functions/postFunctions/getMostLikedPosts");
const getPostsByDate = require("../functions/postFunctions/getPostsByDate");
const getPostById = require("../functions/postFunctions/getPostById");
const getFollowingPosts = require("../functions/postFunctions/GetFollowingPosts");
const hasAuthorization = require("../functions/authFunctions/hasAuthorization");
const groupPosts = require("../functions/postFunctions/groupPosts");
const groupPostsByCategory = require("../functions/postFunctions/groupPostsByCategory");
const searchBrandAndProduct = require("../functions/postFunctions/searchBrandAndProduct");
const searchPostsByBrand = require("../functions/postFunctions/searchPostsByBrand");
const editPost = require("../functions/postFunctions/editPost");


const multer = require("multer");
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const multerConfig = require('./../multer');



//like & unline
router.put("/post/likepost", requireSignin, likePost);
router.put("/post/unlikepost", requireSignin, unlikePost);

//comments
router.put("/post/addcomment", requireSignin, addComment);
router.put("/post/deletecomment", requireSignin, deleteComment);



router.post("/create/new/:userId", requireSignin, multer(multerConfig).array("file"), createPost, createPostValidator);
router.get("/allposts", getPosts);
router.get("/postsby/:userId", postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);


//edit post
router.put("/post/edit_post/:postId", editPost);


//search for posts by similar word
router.put("/post/search_for_post", searchForPosts);

//search product by product name and brand
router.put("/search_products", searchBrandAndProduct);

//search for posts based on brand
router.put("/search_posts_by_brand", searchPostsByBrand);


router.get("/post/the_most_commented", getMostCommented);

router.get("/post/most_liked", getMostLikedPosts);

router.get("/post/the_most_recent", getPostsByDate);

router.get("/post/single_post/:postId", getPostById);



router.get("/feed/:userId",  requireSignin, getFollowingPosts);


//group posts by brand and productname with the average rating
router.get("/groupposts", groupPosts);


//group posts by category with rating score
router.get("/grouppostsbycategory", groupPostsByCategory);





//photo
router.get("/post/photo/:postId", postPhoto);


//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

//any route containing :postId, our app will first execute postById()
router.param("postId", postById);



//photo
//router.get("/post/photo/:postId", postPhoto);

module.exports = router;