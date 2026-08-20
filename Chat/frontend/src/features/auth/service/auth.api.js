import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const registerUser = async ({ name, email, password }) => {
  const response = await authApiInstance.post("/auth/register", {name, email, password});

  return response.data;
};

export const loginUser = async ({email, password}) => {
    const response = await authApiInstance.post("/auth/login", {email, password})

    return response.data
}

export const logoutUser = async () => {
    const response = await authApiInstance.get("/auth/logout")

    return response.data
}

export const currentUser = async () => {
    const response = await authApiInstance.get("/auth/me")

    return response.data
}
