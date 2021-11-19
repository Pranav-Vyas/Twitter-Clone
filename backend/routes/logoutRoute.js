const express = require("express");
const User = require("../models/UserSchema");
const middleware = require("../middleware");

const router = express.Router();

router.get("/", middleware, async (req, res) => {
    try {
        req.foundUser.tokens = req.foundUser.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.foundUser.save();
        res.status(200).json({logout: true});
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router;