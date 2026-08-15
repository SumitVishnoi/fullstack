import express from "express"
import { forgotPassword, getMe, googleCallback, login, logout, register, verifyOtp } from "../controller/auth.controller.js"
import { authenticateUser } from "../middlewares/user.middleware.js"
import passport from "passport"

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
 * @route POST /api/auth/logout
 * @description to remove the current loggedin user
 */
router.get("/logout", authenticateUser, logout)

/**
 * @route POST /api/auth/forget-password
 * @description to forget the old password to new
 */
router.post("/forgot-password", forgotPassword)

/**
 * @route POST /api/auth/verify-otp
 * @description verify the otp
 */
router.post("/verify-otp", verifyOtp)

/**
 * @route GET /api/auth/me
 * @description get current user
 * @access Private
 */
router.get("/me", authenticateUser, getMe)

router.get("/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Route that Google redirects to
router.get("/google/callback", 
  passport.authenticate("google", { session: false, failureRedirect: "/login" }), 
  googleCallback // Your controller function handles the response
);

export default router