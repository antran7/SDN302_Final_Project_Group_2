import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useApp } from "../Context/AppContext";
import {
  LayoutDashboard,
  Car,
  Users,
  FileText,
  ShoppingCart,
  BarChart3,
  Package,
  Store,
  Percent,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../Styles/sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  const { sidebarCollapsed, toggleSidebar } = useApp();

  const dealerMenuItems = [
    { path: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/vehicles", label: "Danh mục xe", icon: Car },
    { path: "/customers", label: "Khách hàng", icon: Users },
    { path: "/orders", label: "Đơn hàng", icon: ShoppingCart },
    { path: "/quotations", label: "Báo giá", icon: FileText },
    { path: "/test-drives", label: "Lịch lái thử", icon: Calendar },
    { path: "/promotions", label: "Khuyến mãi", icon: Percent },
    { path: "/feedback", label: "Phản hồi", icon: MessageSquare },
    { path: "/reports", label: "Báo cáo", icon: BarChart3 },
  ];

  const evmMenuItems = [
    { path: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/vehicles", label: "Quản lý xe", icon: Car },
    { path: "/dealers", label: "Quản lý đại lý", icon: Store },
    { path: "/inventory", label: "Tồn kho", icon: Package },
    { path: "/promotions", label: "Chính sách KM", icon: Percent },
    { path: "/reports", label: "Báo cáo & Phân tích", icon: BarChart3 },
  ];

  const menuItems =
    user?.role === "Admin" || user?.role === "EVM Staff"
      ? evmMenuItems
      : dealerMenuItems;

  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!sidebarCollapsed && (
          <div className="sidebar-logo">
            <Car size={32} />
            <span>EV System</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
              title={sidebarCollapsed ? item.label : ""}
            >
              <Icon size={20} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </aside>
  );
};

export default Sidebar;
