import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
    messages: [
        {
            type: String
        }
    ]
},{
    timestamps: true
})

const conversationModel = mongoose.model("conversation", conversationSchema)

export default conversationModel