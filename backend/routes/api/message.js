const express = require("express");
const Message = require("../../models/MessageSchema");
const router = express.Router();

// router.post("/", async (req, res) => {
//     console.log("in message post route");
//     const newMessage = new Message(req.body);
//     newMessage.save()
//     .then((message) => {
//         return res.status(200).json({Message: message});
//     })
//     .catch((err) => {
//         console.log(err);
//         return res.status(500).json({Message: false});
//     })
// })

// router.get("/:id", async (req, res) => {
//     const curUser = req.header('curUser');
//     try {
//         const messages = await Message.find({
//             $or: [
//                 {'sender': curUser, 'reciever': req.params.id},
//                 {'reciever': curUser, 'sender': req.params.id}
//             ]
//         })
//         res.status(200).json({messages: messages});
//     } catch (error) {
//         res.status(400).json({messages: false})
//     }
// })
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    console.log("message post route ",newMessage);
    newMessage.save()
    .then((message) => {
        return res.status(200).json({Message: message});
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({Message: false});
    })
})

router.get("/:id", async (req, res) => {
    console.log("message get request called");
    try {
        const messages = await Message.find({
            conversationId: req.params.id
        })
        res.status(200).json({messages: messages});
    } catch (error) {
        res.status(400).json({messages: false})
    }
})

module.exports = router;