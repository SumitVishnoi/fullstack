import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import cookieParse from "cookie-parser"
import cookieParser from "cookie-parser"
import chatRouter from "./routes/chat.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/chat", chatRouter)

export default app