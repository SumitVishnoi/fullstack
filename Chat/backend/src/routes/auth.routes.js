import express from  "express"
import { getMe, login, logout, register } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middlewares/auth.middleware.js"

const router = express.Router()

/**
 * @route POST /api/auth/regiser
 * @description To create a new user
 */
router.post("/register", register)

/**
 * @route POST /api/auth/login
 * @description login to existing user
 */
router.post("/login", login)

/**
 * @route GET /api/auth/logout
 * @description to remove the current loggedin user
 * @access Private
 */
router.get("/logout", authenticateUser, logout)

/**
 * @route GET /api/auth/me
 * @description fetch current user
 * @access Private
 */
router.get("/me", authenticateUser, getMe)

export default router