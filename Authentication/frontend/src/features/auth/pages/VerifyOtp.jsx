import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import axios from "axios";
import useAuth from "../hook/useAuth";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Forgot password page se email receive hoga
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {handleVerifyOTP} = useAuth()

  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Only numbers + maximum 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await handleVerifyOTP({email, otp, })

      setMessage(
        response.data.message || "OTP verified successfully."
      );

      // Backend can return resetToken
      const resetToken = response.data.resetToken;

      // Move to reset password page
      navigate("/reset-password", {
        state: {
          email,
          resetToken,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      setError("");
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      setMessage(
        response.data.message || "A new OTP has been sent."
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  // If user directly opens /verify-otp
  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">

          <h1 className="text-2xl font-bold">
            Invalid Request
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            Please request a password reset first.
          </p>

          <Link
            to="/forgot-password"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 font-semibold"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Back */}
        <Link
          to="/forgot-password"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <ShieldCheck
              size={32}
              className="text-indigo-600"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center">
          Verify OTP
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          We've sent a 6-digit OTP to
        </p>

        <p className="text-center font-semibold text-gray-700 mb-6">
          {email}
        </p>

        {/* Success */}
        {message && (
          <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* OTP Form */}
        <form
          onSubmit={handleVerifyOtp}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium">
              Enter OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              placeholder="••••••"
              className="w-full mt-2 border rounded-xl py-4 text-center text-2xl tracking-[0.5em] font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Verify */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            className="text-indigo-600 font-semibold text-sm mt-1 hover:text-indigo-700 disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        {/* Login */}
        <p className="text-center mt-6 text-gray-600">
          Remember your password?

          <Link
            to="/login"
            className="text-indigo-600 ml-1 font-semibold hover:text-indigo-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;