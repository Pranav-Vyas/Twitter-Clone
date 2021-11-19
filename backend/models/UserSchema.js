const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: Buffer
        },
        coverPhoto: {
            type: Buffer
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        saves: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        retweets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

UserSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id: this._id}, process.env.KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch(err) {
        console.log(err);
    }
}

const User = new mongoose.model("User", UserSchema);

module.exports = User;