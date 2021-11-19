const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

router.get("/", middleware, (req, res) => {
    console.log("this is home");
    res.status(200).send(req.foundUser);
})

module.exports = router;