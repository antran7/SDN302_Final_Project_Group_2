import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Car } from 'lucide-react';
import { authService } from '../services/auth.service';
import '../Styles/login.css';

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log(email, password);

    try {
      const response = await authService.login(email, password);
      // Normalize response: some backends return { user, token }, others return user directly
      const userPayload = response?.user || response;
      localStorage.setItem('token', response.access_token);
      login(userPayload);
      // No imperative navigation here — component will re-render and the check below will redirect
    } catch (error) {
      setError(error.message || (error?.message) || 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    // If already logged in, redirect to dashboard. This lets the AuthContext update trigger a navigation without useNavigate.
    user ? <Navigate to="/dashboard" replace /> : (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <Car size={48} />
          <h1>EV Dealer Management</h1>
          <p>Hệ thống quản lý bán xe điện</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Tên đăng nhập</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
        </form>

        <div className="login-demo-accounts">
          <p>Tài khoản demo:</p>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>EVM Staff:</strong> evmstaff / evm123</li>
            <li><strong>Dealer Manager:</strong> dealer1 / dealer123</li>
            <li><strong>Dealer Staff:</strong> staff1 / staff123</li>
          </ul>
        </div>
      </div>
    </div>
    )
  );
};

export default Login;
