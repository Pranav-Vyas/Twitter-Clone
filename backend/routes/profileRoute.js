const express = require("express");
const User = require("../models/UserSchema");
const Post = require("../models/PostSchema");
const router = express.Router();
const middleware = require("../middleware");

router.get("/posts/:id", middleware, async (req, res) => {
    var userId = req.params.id;
    console.log("Hey, your are in profile route.  ",userId);
    Post.find({postedBy: userId})
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .sort({"createdAt": -1})
    .then( async (results) => {
        results = await User.populate(results, {path: "replyTo.postedBy"})
        res.status(200).json({results: results, userId: req.foundUser._id})
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({results: []});
    })
})

router.get("/user/:id", async (req, res) => {
    var userId = req.params.id;
    console.log("Hey, your are in profile like route.  ",userId);
    User.findOne({_id: userId})
    .populate({
        path:"likes",
        populate: ['postedBy', 'retweetData', 'replyTo']
    })
    .populate({
        path:"saves",
        populate: ['postedBy', 'retweetData', 'replyTo']
    })
    .then((user) => {
        console.log(user);
        return res.status(200).json({user:user});
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({user:false});
    })
})

module.exports = router;
