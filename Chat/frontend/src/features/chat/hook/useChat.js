import { getMessages, sendMessage } from "../service/chat.service"


export const useChat = ()=> {
    const handleSendMessage = async ({message})=> {
        const data = await sendMessage({message})
        console.log(data)
        return data
    }

    const handleGetMessages = async ()=> {
        const data = await getMessages()
        console.log(data)
    }
    return {
        handleSendMessage,
        handleGetMessages
    }
}