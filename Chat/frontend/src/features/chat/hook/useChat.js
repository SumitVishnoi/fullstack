import { deleteMessage, getMessages, sendMessage, updateMessage } from "../service/chat.service"


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

    const handleUpdateMessage = async ({message, id})=> {
        const data = await updateMessage({message, id})
        console.log(data)
        return data
    }

    const handleDeleteMessage = async (id)=> {
        const data = await deleteMessage(id)
        console.log(data)
        return data
    }

    
    return {
        handleSendMessage,
        handleGetMessages,
        handleUpdateMessage,
        handleDeleteMessage
    }
}