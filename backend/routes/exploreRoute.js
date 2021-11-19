const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const middleware = require("../middleware");

router.get("/", middleware, (req, res) => {
    User.find()
    .then((results) => {
        res.status(200).json({results: results});
    }).catch (err => {
        console.log(err);
        res.status(400).json({results: []});
    })
})

module.exports = router;