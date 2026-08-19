import { generateToken } from "../config/generateToken.js";
import userModel from "../models/user.model.js";
import { sendEmail } from "../config/gmail.js";
import bcrypt from "bcrypt";

//REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res.status(201).json({
      success: true,
      message: "registered",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "register error",
      error: error.message,
    });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "login error",
      error: error.message,
    });
  }
};

//LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "logout error",
      error: error.message,
    });
  }
};

//FORGET PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html: `<h2>Your OTP is ${otp}</h2>
              <p>This OTP is valid for 5 minutes.</p>`,
    });

    await sendEmail({
      to: email,
      subject: "Forget Password",
      text: "Please click the link below to reset your password",
      html: `<p> successfully</p>`,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "otp send error",
      error: error.message,
    });
  }
};

//VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isValid = await bcrypt.compare(otp, user.otp);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "otp verify error",
      error: error.message,
    });
  }
};

//GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in fetch current user",
      error: error.message,
    });
  }
};

//GOOGLE LOGIN

// This handles the logic AFTER Google redirects back to your server
export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    const { id: googleId, displayName, emails } = req.user;

    const email = emails?.[0]?.value;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account email not found"
      });
    }

    // Check if user already exists
    let user = await userModel.findOne({ email });

    if (!user) {
      // Create new Google user
      user = await userModel.create({
        name: displayName,
        email,
        googleId,
        authProvider: "google"
      }); 
    } else {
      // Update existing user with Google information
      user.googleId = googleId;
      user.authProvider = "google";

      await user.save();
    }

    // Generate JWT using MongoDB user ID
    const token = generateToken(user._id);

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    return res.redirect("http://localhost:5173/");
    
  } catch (error) {
    console.error("Google login error:", error);

    return res.status(500).json({
      success: false,
      message: "Google login failed",
      error: error.message
    });
  }
};

