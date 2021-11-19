const express = require("express");
const User = require("../models/UserSchema");
const Post = require("../models/PostSchema");
const middleware = require("../middleware");
const router = express.Router();



router.get("/", middleware, async (req, res) =>{
    var postId = req.header("postId");
    console.log(postId);
    Post.findOne({_id: postId})
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .then((post) => {
        return res.status(200).json({post: post});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({post: false});
    })
})


router.get("/replies", middleware, async (req, res) =>{
    var postId = req.header("postId");
    console.log("in reply ",postId);
    Post.find({replyTo: postId})
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .then((results) => {
        return res.status(200).json({results: results, userId: req.foundUser._id});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({results: false, userId: req.foundUser._id});
    })
})

module.exports = router;
