const express = require("express");
const Conversation = require("../../models/ConversationSchema");
const router = express.Router();

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId]
    })
    newConversation.save()
    .then((conv) => {
        return res.status(200).json({Conversation: conv});
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({Conversation: false});
    })
})

router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.id]}
        })
        .populate("members")
        res.status(200).json({conversations: conversations});
    } catch {
        res.status(400).json({conversation: false});
    }
})

module.exports = router;