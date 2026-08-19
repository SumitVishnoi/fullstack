import React from 'react'
import { useEffect } from 'react'
import { initializedSocketConnection } from '../service/chat.socket'

const Dashboard = () => {
    useEffect(()=> {
        initializedSocketConnection()
    }, [])
  return (
    <div>
      dashboard
    </div>
  )
}

export default Dashboard
