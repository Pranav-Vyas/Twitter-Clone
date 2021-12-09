const express = require("express");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");

router.post("/", async (req, res) =>{
    const {username, password} = req.body;
    if (username && password) {
        const foundUser = await User.findOne( {username:username} );
        if (foundUser) {
            var result = await bcrypt.compare(password, foundUser.password);
            if (result === true) {
                const token = await foundUser.generateAuthToken();
                res.cookie("jwtoken", token, {
                    httpOnly: true
                });
                return res.status(200).json({user: foundUser, token: token});
            }
        }
        return res.status(400).json({user: false});
    }
    return res.status(400).json({user: false});
})

module.exports = router;
