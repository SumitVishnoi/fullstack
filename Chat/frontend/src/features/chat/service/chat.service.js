import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const sendMessage = async ({message})=> {
    const response = await api.post("/api/chat/message", {
        message
    })

    return response.data
}

export const getMessages = async () => {
    const response = await api.get("/api/chat/")

    return response.data
}