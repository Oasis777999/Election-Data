import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import logo from "../Assets/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/admin/login", { email, password });

      const result = response.data;

      if (result?.user?.isActive === true) {
        localStorage.setItem("user", JSON.stringify(result.user));
       navigate("/data", { replace: true });
      } else {
        alert("Your account is inactive. Please contact admin.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow border-0 p-4 p-md-5 bg-lightBlue"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="text-center mb-4 bg-lightBlue">
          <img
            src={logo}
            alt="Logo"
            height="100"
            width="100"
            className="img-fluid bg-lightBlue"
          />
          <h3 className="fw-bold text-primary mt-2 bg-lightBlue">
            Welcome Back
          </h3>
          <p className="text-muted small bg-lightBlue">Login to your account</p>
        </div>

        <div className="mb-3 bg-white">
          <label className="form-label fw-semibold bg-white">Email</label>
          <input
            type="email"
            className="form-control form-control-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. example.gmail.com"
            required
          />
        </div>

        <div className="mb-4 bg-white">
          <label className="form-label fw-semibold bg-white">Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="d-grid mb-3 bg-white">
          <button className="btn btn-warning btn-lg" onClick={handleLogin}>
            Sign In
          </button>
        </div>

        <div className="text-center bg-white">
          <small className="text-muted bg-white">
            Trouble logging in? <br />
            <span className="fw-semibold text-danger fw-bold bg-white">
              Contact support: 9999999999
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
