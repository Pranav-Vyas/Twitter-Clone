const mongoose = require('mongoose');
const ConversationSchema = new mongoose.Schema(
    {
        // members: {
        //     type: Array
        // },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
)

const Conversation = new mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;