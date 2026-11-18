import messageModel from "../models/message.model";



export const sendMessage = async(req, res) => {
    try {
        const {message} = req.body;

        if(!message) {
            return res.satus(400).json({
                success: false,
                message: "Please send the message"
            })

        const msg = await messageModel.create({
            sender: req.user,
            receiver: req.params,
            message
        })
         return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: msg,
    });

        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getMessages = async(req, res) => {
    try {
        const messages = await messageModel.find({
            $or: [
                { sender: req.user, receiver: req.params},
                { sender: req.params, receiver: req.user}
            ]
        })

        return res.status(200).jsonP({
            success: true,
            message: "Messages fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
