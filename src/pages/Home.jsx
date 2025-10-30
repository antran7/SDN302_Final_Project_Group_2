import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getVehicles } from "../services/api";
import "../styles/dashboard.css";

export default function Home() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (user) {
      (async () => {
        const v = await getVehicles();
        setVehicles(v);
        const d = JSON.parse(localStorage.getItem("dealers")) || [
          { id: 1, name: "Green Auto Dealer" },
          { id: 2, name: "Sun EV Distribution" },
        ];
        const c = JSON.parse(localStorage.getItem("customers")) || [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ];
        setDealers(d);
        setCustomers(c);
      })();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h2>Chào mừng đến với EV Dealer System ⚡</h2>
        <p className="text-muted mt-3">
          Quản lý hệ thống đại lý, xe điện và khách hàng một cách dễ dàng và hiệu quả.
        </p>
        <Link to="/login" className="btn btn-primary mt-3">
          Đăng nhập để bắt đầu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Chào mừng, {user.username} 👋</h2>
      <p className="text-muted">Tổng quan hệ thống của bạn hôm nay</p>

      <div className="row mt-4 g-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <h5>Tổng số xe</h5>
            <h2 className="text-primary">{vehicles.length}</h2>
            <Link to="/vehicles" className="btn btn-outline-primary btn-sm">
              Quản lý xe
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <h5>Đại lý</h5>
            <h2 className="text-success">{dealers.length}</h2>
            <Link to="/dealers" className="btn btn-outline-success btn-sm">
              Quản lý đại lý
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <h5>Khách hàng</h5>
            <h2 className="text-warning">{customers.length}</h2>
            <Link to="/customers" className="btn btn-outline-warning btn-sm">
              Quản lý khách hàng
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h5>Báo cáo doanh số gần đây</h5>
        <p className="text-muted">Xem biểu đồ phân tích tại mục Báo cáo & Phân tích</p>
        <Link to="/reports" className="btn btn-primary">
          Xem Báo cáo
        </Link>
      </div>
    </div>
  );
}
