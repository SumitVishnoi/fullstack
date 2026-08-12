import React from 'react'
import { forgotPassword, getCurrentUser, loginUser, logout, registerUser, verifyOTP } from '../service/auth.api'

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
      console.log(data)
    }

    const handleGetCurrentUser = async ()=> {
      const data = await getCurrentUser()
      console.log(data)
    }

    const handleForgotPassword = async ({email})=> {
      const data = await forgotPassword({email})
      console.log(data)
    }

    const handleVerifyOTP = async ({email, otp, password})=> {
      const data = await verifyOTP({email, otp, password})

      console.log("verifired", data)
    }
  return {
    handleRegisterUser,
    handleLoginUser,
    handleLogout,
    handleGetCurrentUser,
    handleForgotPassword,
    handleVerifyOTP
  } 

}

export default useAuth
