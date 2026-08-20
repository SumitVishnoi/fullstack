import { currentUser, loginUser, logoutUser, registerUser } from "../service/auth.api"


export const useAuth = ()=> {
    const handleRegisterUser = async ({name, email, password}) => {
        const data = await registerUser({name, email, password})
        console.log(data.user)
        return data.user
    }

    const handleLoginUser = async ({email, password}) => {
        const data = await loginUser({email, password})
        console.log(data.user)
        return data.user
    }

    const handleLogoutUser = async () => {
        const data = await logoutUser()
        return data
    }

    const handleCurrenttUser = async () => {
        const data = await currentUser()

        return data.user
    }

    return {
        handleRegisterUser,
        handleLoginUser,
        handleLogoutUser,
        handleCurrenttUser
    }
}