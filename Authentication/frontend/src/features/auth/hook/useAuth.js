import React from "react";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  logout,
  registerUser,
  verifyOTP,
} from "../service/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const handleRegisterUser = async ({ name, email, password }) => {
    const data = await registerUser({ name, email, password });
    console.log(data);
    setUser(data.user);
  };

  const handleLoginUser = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    console.log(data);
    setUser(data.user);
  };

  const handleLogout = async () => {
    const data = await logout();
    console.log(data);
    setUser(null)
  };

  const handleGetCurrentUser = async () => {
    try {
      setLoading(true)
      const data = await getCurrentUser();
      console.log(data);
      setUser(data.user);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  const handleForgotPassword = async ({ email }) => {
    const data = await forgotPassword({ email });
    console.log(data);
  };

  const handleVerifyOTP = async ({ email, otp, password }) => {
    const data = await verifyOTP({ email, otp, password });

    console.log("verifired", data);
  };
  return {
    user, 
    setUser,
    loading,
    setLoading,
    handleRegisterUser,
    handleLoginUser,
    handleLogout,
    handleGetCurrentUser,
    handleForgotPassword,
    handleVerifyOTP,
  };
};

export default useAuth;
