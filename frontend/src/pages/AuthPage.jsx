import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  registerUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../features/auth/authSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: reduxError } = useSelector((state) => state.auth);

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [profileImage, setProfileImage] = useState(null);

  const clearMessages = () => {
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      if (isRegisterMode) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (profileImage) {
          formData.append("profileImage", profileImage);
        }

        await dispatch(registerUser(formData)).unwrap();

        setMessage("Registration successful. Please login");
        setIsRegisterMode(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        await dispatch(loginUser({ email, password })).unwrap();

        setMessage("Login successful");
        setPassword("");
        navigate("/");
      }
    } catch (err) {
      // thunkAPI.rejectWithValue(err.response.data.message) means the
      // rejected payload here IS the message string already
      setError(err || "Something went wrong");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      const data = await dispatch(forgotPassword(email)).unwrap();
      setMessage(data.message);
      setStep(2);
    } catch (err) {
      setError(err || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      const data = await dispatch(verifyOTP({ email, otp })).unwrap();
      setResetToken(data.resetToken);
      setMessage("OTP verified successfully");
      setStep(3);
    } catch (err) {
      setError(err || "OTP verification failed");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      const data = await dispatch(
        resetPassword({ resetToken, newPassword }),
      ).unwrap();

      setMessage(data.message);

      setTimeout(() => {
        setShowForgotPassword(false);
        setStep(1);

        setOtp("");
        setNewPassword("");
        setResetToken("");
        setPassword("");
      }, 2000);
    } catch (err) {
      setError(err || "Password reset failed");
    }
  };

  const displayError = error || reduxError;

  return (
    <>
      <Header />

      <div className="ledger-auth-container">
        <div className="ledger-auth-card">
          <span className="ledger-eyebrow ledger-auth-eyebrow">
            The Daily Ledger · Member Access
          </span>

          {displayError && (
            <div className="ledger-alert ledger-alert--error">
              <span>Error</span>
              {displayError}
            </div>
          )}

          {message && (
            <div className="ledger-alert ledger-alert--success">
              <span>Notice</span>
              {message}
            </div>
          )}

          {showForgotPassword ? (
            <>
              <h2 className="ledger-auth-title">Forgot Password</h2>

              {step === 1 && (
                <form
                  className="ledger-auth-form"
                  onSubmit={handleForgotPassword}
                >
                  <div className="ledger-auth-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="ledger-auth-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="ledger-auth-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step === 2 && (
                <form className="ledger-auth-form" onSubmit={handleVerifyOTP}>
                  <div className="ledger-auth-group">
                    <label>One-Time Password</label>
                    <input
                      type="text"
                      className="ledger-auth-input"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="ledger-auth-btn"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}

              {step === 3 && (
                <form
                  className="ledger-auth-form"
                  onSubmit={handleResetPassword}
                >
                  <div className="ledger-auth-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="ledger-auth-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="ledger-auth-btn"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}

              <p className="ledger-auth-toggle">
                <span
                  className="ledger-auth-link"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setStep(1);
                    clearMessages();
                  }}
                >
                  ← Back to login
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="ledger-auth-title">
                {isRegisterMode ? "Create Your Account" : "Welcome Back"}
              </h2>

              <form className="ledger-auth-form" onSubmit={handleSubmit}>
                {isRegisterMode && (
                  <div className="ledger-auth-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="ledger-auth-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="ledger-auth-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="ledger-auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="ledger-auth-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="ledger-auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {isRegisterMode && (
                  <div className="ledger-auth-group">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      className="ledger-auth-input ledger-auth-input--file"
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                  </div>
                )}

                {!isRegisterMode && (
                  <p
                    className="ledger-forgot-link"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setStep(1);
                      clearMessages();
                    }}
                  >
                    Forgot password?
                  </p>
                )}

                <button
                  type="submit"
                  className="ledger-auth-btn"
                  disabled={loading}
                >
                  {loading
                    ? isRegisterMode
                      ? "Registering..."
                      : "Logging in..."
                    : isRegisterMode
                      ? "Register"
                      : "Login"}
                </button>

                {!isRegisterMode && (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                        margin: "18px 0",
                        color: "#777",
                      }}
                    >
                      OR
                    </div>

                    <button
                      type="button"
                      className="ledger-auth-btn"
                      style={{
                        background: "#fff",
                        color: "#444",
                        border: "1px solid #ddd",
                      }}
                      onClick={() => {
                        window.location.href =
                          "https://journal-backend-2i4l.onrender.com/api/auth/google";
                      }}
                    >
                      Continue with Google
                    </button>
                  </>
                )}
              </form>

              <p className="ledger-auth-toggle">
                {isRegisterMode
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <span
                  className="ledger-auth-link"
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    clearMessages();
                  }}
                >
                  {isRegisterMode ? "Login" : "Register"}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
