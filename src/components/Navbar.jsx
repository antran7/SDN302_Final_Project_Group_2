import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useApp } from '../Context/AppContext';
import { Bell, User, LogOut, Menu, Settings } from 'lucide-react';
import '../Styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleSidebar, notifications } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="navbar-title">EV Dealer Management</h1>
      </div>

      <div className="navbar-right">
        <div className="notification-container">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">Thông báo</div>
              {notifications.length === 0 ? (
                <div className="notification-empty">Không có thông báo mới</div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    {notif.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="user-container">
          <button
            className="user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User size={20} />
            <span className="user-name">{user?.name}</span>
          </button>
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <div className="user-info-name">{user?.name}</div>
                <div className="user-info-role">{user?.role}</div>
                <div className="user-info-email">{user?.email}</div>
              </div>
              <div className="user-menu-divider"></div>
              <button className="user-menu-item">
                <Settings size={16} />
                Cài đặt
              </button>
              <button className="user-menu-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
