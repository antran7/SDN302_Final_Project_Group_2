import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockUsers } from '../mockData/users';
import { Car } from 'lucide-react';
import '../Styles/login.css';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      login(user);
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <Car size={48} />
          <h1>EV Dealer Management</h1>
          <p>Hệ thống quản lý bán xe điện</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
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
  );
};

export default Login;
