import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const registerUser = async ({name, email, password})=> {
    const response = await authApiInstance.post("/api/auth/register", {name, email, password})

    return response.data
}

export const loginUser = async ({email, password})=> {
    const response = await authApiInstance.post("/api/auth/login", {email, password})

    return response.data
}

export const logout = async ()=> {
    const response = await authApiInstance.get("/api/auth/logout")

    return response.data
}

export const getCurrentUser = async ()=> {
    const response = await authApiInstance.get("/api/auth/me")

    return response.data
}

export const forgotPassword = async ({email})=> {
    const response = await authApiInstance.post("/api/auth/forgot-password", {email})

    return response.data
}

export const verifyOTP = async ({email, otp, password})=> {
    const response = await authApiInstance.post("/api/auth/verify-otp", {email, otp, password})

    return response.data
}