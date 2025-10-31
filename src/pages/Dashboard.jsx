import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockOrders } from '../mockData/orders';
import { mockVehicles } from '../mockData/vehicles';
import { mockDealers, mockDealerInventory } from '../mockData/dealers';
import { mockCustomers } from '../mockData/customers';
import { Car, Users, ShoppingCart, DollarSign, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  // Calculate stats based on user role
  const calculateStats = () => {
    if (user.role === 'Admin' || user.role === 'EVM Staff') {
      // EVM stats
      const totalRevenue = mockOrders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + o.totalAmount, 0);
      
      const totalStock = mockVehicles.reduce((sum, v) => sum + v.stock, 0);
      
      return {
        totalDealers: mockDealers.length,
        activeDealers: mockDealers.filter(d => d.status === 'active').length,
        totalRevenue,
        totalStock,
        totalOrders: mockOrders.length,
        pendingOrders: mockOrders.filter(o => o.status === 'pending_delivery').length
      };
    } else {
      // Dealer stats
      const dealerOrders = mockOrders.filter(o => o.dealerId === user.dealerId);
      const dealerRevenue = dealerOrders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + o.totalAmount, 0);
      
      const dealerCustomers = mockCustomers.filter(c => c.dealerId === user.dealerId);
      const dealerInventory = mockDealerInventory.filter(i => i.dealerId === user.dealerId);
      const totalStock = dealerInventory.reduce((sum, i) => sum + i.quantity, 0);

      return {
        totalOrders: dealerOrders.length,
        pendingOrders: dealerOrders.filter(o => o.status === 'pending_delivery').length,
        totalRevenue: dealerRevenue,
        totalCustomers: dealerCustomers.length,
        totalStock
      };
    }
  };

  const stats = calculateStats();
  const isEVM = user.role === 'Admin' || user.role === 'EVM Staff';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const recentOrders = mockOrders
    .filter(o => isEVM || o.dealerId === user.dealerId)
    .slice(0, 5);

  // Prepare chart data
  const salesByVehicle = mockVehicles.map(vehicle => {
    const orders = mockOrders.filter(o => 
      o.vehicleId === vehicle.id && 
      o.status === 'delivered' &&
      (isEVM || o.dealerId === user.dealerId)
    );
    return {
      name: vehicle.model,
      sales: orders.reduce((sum, o) => sum + o.totalAmount, 0) / 1000000000,
      quantity: orders.length
    };
  }).filter(item => item.quantity > 0);

  const salesByMonth = [
    { month: 'T7', revenue: 850 },
    { month: 'T8', revenue: 1200 },
    { month: 'T9', revenue: 980 },
    { month: 'T10', revenue: 1450 }
  ];

  const dealerPerformance = isEVM ? mockDealers.map(dealer => ({
    name: dealer.name.replace('Đại lý ', ''),
    progress: Math.round((dealer.currentSales / dealer.salesTarget) * 100)
  })) : [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tổng quan</h1>
        <p>Xin chào, {user.name} - {user.role}</p>
      </div>

      <div className="stats-grid">
        {isEVM ? (
          <>
            <div className="stat-card">
              <div className="stat-icon blue">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Tổng đại lý</div>
                <div className="stat-value">{stats.totalDealers}</div>
                <div className="stat-subtitle">
                  {stats.activeDealers} đang hoạt động
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Doanh thu</div>
                <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
                <div className="stat-subtitle">Tổng doanh thu đã giao xe</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <Package size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Tồn kho</div>
                <div className="stat-value">{stats.totalStock}</div>
                <div className="stat-subtitle">xe tại kho trung tâm</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <ShoppingCart size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Đơn hàng</div>
                <div className="stat-value">{stats.totalOrders}</div>
                <div className="stat-subtitle">
                  {stats.pendingOrders} đang chờ giao
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="stat-card">
              <div className="stat-icon blue">
                <ShoppingCart size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Đơn hàng</div>
                <div className="stat-value">{stats.totalOrders}</div>
                <div className="stat-subtitle">
                  {stats.pendingOrders} đang chờ giao
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Doanh thu</div>
                <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
                <div className="stat-subtitle">Xe đã giao</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Khách hàng</div>
                <div className="stat-value">{stats.totalCustomers}</div>
                <div className="stat-subtitle">Tổng khách hàng</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <Car size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Tồn kho</div>
                <div className="stat-value">{stats.totalStock}</div>
                <div className="stat-subtitle">xe tại đại lý</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="dashboard-content">
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Doanh thu theo xe (Tỷ VNĐ)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByVehicle}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Xu hướng doanh thu (Triệu VNĐ)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Doanh thu" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {isEVM && (
            <div className="chart-card">
              <h3>Hiệu suất đại lý (%)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dealerPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" fill="#8b5cf6" name="Hoàn thành" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="chart-card">
            <h3>Phân bố đơn hàng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByVehicle}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantity"
                >
                  {salesByVehicle.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="recent-orders">
          <h2>Đơn hàng gần đây</h2>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Xe</th>
                  <th>Giá trị</th>
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => {
                  const customer = mockCustomers.find(c => c.id === order.customerId);
                  const vehicle = mockVehicles.find(v => v.id === order.vehicleId);
                  return (
                    <tr key={order.id}>
                      <td>{order.orderNumber}</td>
                      <td>{customer?.name}</td>
                      <td>{vehicle?.name}</td>
                      <td>{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status === 'delivered' && 'Đã giao'}
                          {order.status === 'pending_delivery' && 'Chờ giao'}
                          {order.status === 'quotation' && 'Báo giá'}
                        </span>
                      </td>
                      <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
