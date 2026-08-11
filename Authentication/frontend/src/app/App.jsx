import './App.css'
import {RouterProvider} from "react-router"
import { routes } from './app.route'
import useAuth from '../features/auth/hook/useAuth'
import { useEffect } from 'react'

function App() {

  const {handleGetCurrentUser} = useAuth()

  useEffect(()=> {
    handleGetCurrentUser()
  }, [])

  return (
    <RouterProvider router={routes} />
  )
}

export default App
