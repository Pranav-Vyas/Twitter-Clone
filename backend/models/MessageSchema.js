const mongoose = require('mongoose');
// const MessageSchema = new mongoose.Schema(
//     {
//         sender: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         reciever: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         text: {
//             type: String
//         }
//     },
//     {
//         timestamps: true
//     }
// )
const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Message = new mongoose.model("Message", MessageSchema);
module.exports = Message;