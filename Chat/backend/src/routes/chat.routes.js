import express from "express"
import { getMessages, sendMessage } from "../controllers/chat.controller"
import { authenticateUser } from "../middlewares/auth.middleware"

const router = express.Router()

router.post("/message", authenticateUser, sendMessage)
router.get("/", authenticateUser, getMessages)

export default router