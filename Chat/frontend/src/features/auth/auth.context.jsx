import React, { createContext, useState } from 'react'


export const AuthContext = createContext(null)

const AuthPrvoider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

  return (
    <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthPrvoider
