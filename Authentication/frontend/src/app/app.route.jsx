import {createBrowserRouter} from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import ForgotPassword from "../features/auth/pages/ForgotPasword"
import VerifyOtp from "../features/auth/pages/VerifyOtp"

export const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }, 
    {
        path: "/",
        element: <h1>hello</h1>
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path:"/verify-otp",
        element: <VerifyOtp />
    }
])