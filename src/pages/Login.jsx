import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-card shadow-lg">
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048313.png"
            alt="EV Logo"
            className="login-logo"
          />
          <h3 className="fw-bold text-white mt-3">EV Dealer System</h3>
          <p className="text-light">Đăng nhập để quản lý hệ thống của bạn</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-primary w-100 btn-lg">Đăng nhập</button>
        </form>

        <div className="text-center mt-4">
          <small className="text-light">
            Tài khoản demo: <b>admin / 123</b>
          </small>
        </div>
      </div>
    </div>
  );
}
