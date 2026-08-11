import React from 'react'
import { getCurrentUser, loginUser, logout, registerUser } from '../service/auth.api'

const useAuth = () => {
    const handleRegisterUser = async ({name, email, password})=> {
        const data = await registerUser({name, email, password})
        console.log(data)
    }

    const handleLoginUser = async ({email, password})=> {
      const data = await loginUser({email, password})
      console.log(data)
    }

    const handleLogout = async ()=> {
      const data = await logout()
      consolelog(data)
    }

    const handleGetCurrentUser = async ()=> {
      const data = await getCurrentUser()
      console.log(data)
    }
  return {
    handleRegisterUser,
    handleLoginUser
  } 

}

export default useAuth
