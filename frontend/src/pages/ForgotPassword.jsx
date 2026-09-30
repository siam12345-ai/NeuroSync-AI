import "../App.css";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Email is required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/auth/forgot-password", {
        email
      });

      setMessage(
        res.data.message || "Password reset instructions sent."
      );

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Unable to process password reset request."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-header">

          <h1 className="logo">
            🧠 NeuroSync AI
          </h1>

          <p className="subtitle">
            Intelligent Cognitive Learning Platform
          </p>

          <h2>
            Forgot Password
          </h2>

          <p className="login-text">
            Enter your email to reset your password.
          </p>

        </div>

        {message && (
          <div className="login-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="register-section">

          <p>
            Remember your password?
          </p>

          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Back to Login
          </a>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;