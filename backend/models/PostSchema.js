const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        pinned: {
            type: Boolean
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        saves: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        retweets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        retweetData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        timestamps: true
    }
)

const Post = new mongoose.model("Post", PostSchema);
module.exports = Post;