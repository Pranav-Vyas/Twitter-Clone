const express = require("express");
const User = require("../../models/UserSchema");
const router = express.Router();
const middleware = require("../../middleware");
const multer = require('multer');

const upload = multer({
    limits : {
        fileSize: 2000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }
        console.log("it worked");
        cb(undefined, true)
    }
})

router.post("/avatar", middleware, upload.single('avatar'), async (req, res) => {
    console.log("your are in avatar post request");
    req.foundUser.avatar = req.file.buffer;
    await req.foundUser.save();
    res.send();
})

router.post("/coverPhoto", middleware, upload.single('coverPhoto'), async (req, res) => {
    console.log("your are in coverPhoto post request");
    req.foundUser.coverPhoto = req.file.buffer;
    await req.foundUser.save();
    res.send();
})


router.delete("/avatar", middleware, async (req, res) => {
    req.foundUser.avatar = undefined;
    await req.foundUser.save();
    res.send();
})


router.get("/:id/avatar", async (req, res) => {
    console.log("in avatar route");
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

router.get("/:id/coverPhoto", async (req, res) => {
    console.log("in coverPhoto route");
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/jpg');
        res.send(user.coverPhoto);
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

module.exports = router;