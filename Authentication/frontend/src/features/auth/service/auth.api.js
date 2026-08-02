import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const registerUser = async ({name, email, password})=> {
    const response = await authApiInstance.post("/api/register", {name, email, password})

    return response.data
}