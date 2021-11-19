const express = require("express");
const User = require("../../models/UserSchema");
const Conversation = require("../../models/ConversationSchema");
const router = express.Router();
const middleware = require("../../middleware");

router.get("/", middleware, (req, res) => {
    var userId = req.header('userId');
    var isFollowing = req.foundUser.following && req.foundUser.following.includes(userId);
    return res.status(200).json({isFollowing: isFollowing});
})

router.get("/getFollowers", middleware, (req, res) => {
    var userId = req.header('userId');
    User.findOne({_id: userId})
    .populate('followers')
    .populate('following')
    .then( async (user) => {
        return res.status(200).json({user: user});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({user: false});
    })
})

router.put("/", middleware, async (req, res) => {
    var userId = req.body.userId;
    var isFollowed = req.foundUser.following && req.foundUser.following.includes(userId);
    var operation = isFollowed ? "$pull" : "$addToSet";
    // console.log(req.foundUser);
    console.log("Your are in put request (follow).");

    // Add to User
    await User.findByIdAndUpdate(req.foundUser._id, { [operation]: {following: userId}})
    .catch(err => {
        console.log(err);
        return res.status(400).json({follow: false});
    })

    var user = await User.findByIdAndUpdate(userId, { [operation]: {followers: req.foundUser._id}}, {new: true})
    .catch(err => {
        console.log(err);
        return res.status(400).json({follow: false});
    })

    const foundConversation = await Conversation.findOne({members: {$all: [req.foundUser._id, userId]}});
    if (!foundConversation) {
        const newConversation = new Conversation({
            members: [userId, req.foundUser._id]
        })
        await newConversation.save()
    }

    return res.status(200).json({follow: true, newFollowers: user.followers.length});
})

module.exports = router;