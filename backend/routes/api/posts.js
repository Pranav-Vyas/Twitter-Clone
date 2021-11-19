const express = require("express");
const User = require("../../models/UserSchema");
const Post = require("../../models/PostSchema");
const router = express.Router();
const middleware = require("../../middleware");

router.get("/", middleware, async (req, res) => {
    Post.find()
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


router.get("/getLikeCount",middleware, async (req, res) => {
    var postId = req.header('postId');
    // console.log(req.header('postId'));
    var newPost = await Post.findOne({_id: postId})
    .catch((err) => {
        console.log(err);
        return res.status(400).json({likeCount: false});
    })
    var isLikedBy = newPost.likes.includes(req.foundUser._id)
    var isSavedBy = newPost.saves.includes(req.foundUser._id)
    var retweeted = newPost.retweets.includes(req.foundUser._id)
    res.status(200).json({isLikedBy: isLikedBy, newPost: newPost, retweeted: retweeted, isSavedBy: isSavedBy});
})


router.post("/", middleware, async (req, res) =>{
    if (!req.body.content) {
        console.log("content not sent from client side");
        return res.status(400).json({message: "Content not sent from client."})
    }
    var postData = {
        content: req.body.content,
        postedBy: req.foundUser
    }
    if (req.header("replyTo")) {
        postData.replyTo = req.header("replyTo");
    } 
    Post.create(postData)
    .then(async (newPost) => {
        newPost = await User.populate(newPost, {path: "postedBy"});
        return res.status(201).json({post: newPost});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({error: err})
    })
})


router.put("/like", middleware, async (req, res) => {
    var postId = req.body.postId;
    var isLiked = req.foundUser.likes && req.foundUser.likes.includes(postId);
    var operation = isLiked ? "$pull" : "$addToSet";
    // console.log(req.foundUser);
    console.log("Your are in put request.");

    // Add to User
    await User.findByIdAndUpdate(req.foundUser._id, { [operation]: {likes: postId}})
    .catch(err => {
        console.log(err);
        return res.status(400).json({like: false});
    })

    // Add to Post
    var newPost = await Post.findByIdAndUpdate(postId, { [operation]: {likes: req.foundUser._id}}, {new: true})
    .catch(err => {
        console.log(err);
        return res.status(400).json({like: false});
    })
    return res.status(200).json({like: true, newPost: newPost});
})


router.put("/save", middleware, async (req, res) => {
    var postId = req.body.postId;
    var isSaved = req.foundUser.saves && req.foundUser.saves.includes(postId);
    var operation = isSaved ? "$pull" : "$addToSet";
    // console.log(req.foundUser);
    console.log("Your are in put request (save).");

    // Add to User
    await User.findByIdAndUpdate(req.foundUser._id, { [operation]: {saves: postId}})
    .catch(err => {
        console.log(err);
        return res.status(400).json({save: false});
    })

    // Add to Post
    var newPost = await Post.findByIdAndUpdate(postId, { [operation]: {saves: req.foundUser._id}}, {new: true})
    .catch(err => {
        console.log(err);
        return res.status(400).json({save: false});
    })
    return res.status(200).json({save: true, newPost: newPost});
})


router.post("/retweet", middleware, async (req, res) => {
    var postId = req.body.postId;
    var content = req.body.content;
    // console.log(req.body);
    var delPost = await Post.findOneAndDelete({ postedBy: req.foundUser._id, retweetData: postId, content: content })
    .catch(err => {
        console.log(err);
        return res.status(400).json({retweet: false});
    })
    var operation = delPost != null ? "$pull" : "$addToSet";
    var repost = delPost;
    if (repost === null) {
        repost = await Post.create({ postedBy: req.foundUser._id, retweetData: postId, content: content})
        .catch(err => {
            console.log(err);
            return res.status(400).json({retweet: false});
        })
    }
    await User.findByIdAndUpdate(req.foundUser._id, { [operation]: {retweets: repost._id}}, {new: true})
    .catch(err => {
        console.log(err);
        return res.status(400).json({retweet: false});
    })
    var newPost = await Post.findByIdAndUpdate(postId, { [operation]: {retweets: req.foundUser._id}}, {new: true})
    .catch(err => {
        console.log(err);
        return res.status(400).json({retweet: false});
    })

    res.status(200).json({retweet: true, newPost: newPost});
})

module.exports = router;
