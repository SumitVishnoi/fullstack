import React from 'react'
import { registerUser } from '../service/auth.api'

const useAuth = () => {
    const handleRegisterUser = async ({name, email, password})=> {
        const data = await registerUser({name, email, password})
        console.log(data)
    }
  return {
    handleRegisterUser
  } 
}

export default useAuth
