import { createBrowserRouter } from "react-router";
import Dashboard from "../features/chat/pages/Dashboard";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path:"/",
        element: <h1>hello</h1>
    }
])