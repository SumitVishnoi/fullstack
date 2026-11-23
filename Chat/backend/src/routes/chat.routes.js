import express from "express"
import { deleteMessage, getMessages, sendMessage, updateMessage } from "../controllers/chat.controller"
import { authenticateUser } from "../middlewares/auth.middleware"

const router = express.Router()

router.post("/message", authenticateUser, sendMessage)
router.get("/", authenticateUser, getMessages)
router.put("/:id", authenticateUser, updateMessage)
router.delete("/:id", authenticateUser, deleteMessage)

export default router