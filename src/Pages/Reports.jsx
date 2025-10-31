import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockOrders } from '../mockData/orders';
import { mockDealers } from '../mockData/dealers';
import { mockVehicles } from '../mockData/vehicles';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import '../Styles/reports.css';

const Reports = () => {
  const { user } = useAuth();
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  const isEVM = user.role === 'Admin' || user.role === 'EVM Staff';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Calculate sales by vehicle
  const salesByVehicle = mockVehicles.map(vehicle => {
    const vehicleOrders = mockOrders.filter(o => 
      o.vehicleId === vehicle.id && 
      o.status === 'delivered' &&
      (isEVM || o.dealerId === user.dealerId)
    );
    
    const totalSales = vehicleOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const quantity = vehicleOrders.length;

    return {
      vehicleName: vehicle.name,
      quantity,
      totalSales
    };
  }).filter(item => item.quantity > 0);

  // Calculate sales by dealer (EVM only)
  const salesByDealer = isEVM ? mockDealers.map(dealer => {
    const dealerOrders = mockOrders.filter(o => 
      o.dealerId === dealer.id && 
      o.status === 'delivered'
    );
    
    const totalSales = dealerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const quantity = dealerOrders.length;

    return {
      dealerName: dealer.name,
      region: dealer.region,
      quantity,
      totalSales,
      progress: Math.round((dealer.currentSales / dealer.salesTarget) * 100)
    };
  }) : [];

  // Inventory status
  const inventoryStatus = mockVehicles.map(vehicle => ({
    vehicleName: vehicle.name,
    stock: vehicle.stock,
    status: vehicle.stock < 20 ? 'low' : vehicle.stock < 50 ? 'medium' : 'high'
  }));

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Báo cáo & Phân tích</h1>
        <button className="export-btn">
          <Download size={20} />
          Xuất báo cáo
        </button>
      </div>

      <div className="reports-filters">
        <div className="filter-group">
          <label>Loại báo cáo:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="sales">Doanh số bán hàng</option>
            {isEVM && <option value="dealers">Theo đại lý</option>}
            <option value="inventory">Tồn kho</option>
            <option value="debt">Công nợ</option>
          </select>
        </div>

        <div className="filter-group">
          <Calendar size={20} />
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm này</option>
          </select>
        </div>
      </div>

      {reportType === 'sales' && (
        <div className="report-section">
          <h2>Báo cáo doanh số theo xe</h2>
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>Mẫu xe</th>
                  <th>Số lượng bán</th>
                  <th>Doanh thu</th>
                  <th>Trung bình</th>
                </tr>
              </thead>
              <tbody>
                {salesByVehicle.map((item, index) => (
                  <tr key={index}>
                    <td>{item.vehicleName}</td>
                    <td className="quantity">{item.quantity}</td>
                    <td className="amount">{formatCurrency(item.totalSales)}</td>
                    <td className="amount">
                      {formatCurrency(item.totalSales / item.quantity)}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>Tổng cộng</td>
                  <td className="quantity">
                    {salesByVehicle.reduce((sum, item) => sum + item.quantity, 0)}
                  </td>
                  <td className="amount">
                    {formatCurrency(salesByVehicle.reduce((sum, item) => sum + item.totalSales, 0))}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportType === 'dealers' && isEVM && (
        <div className="report-section">
          <h2>Báo cáo doanh số theo đại lý</h2>
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>Đại lý</th>
                  <th>Khu vực</th>
                  <th>Số đơn</th>
                  <th>Doanh thu</th>
                  <th>Tiến độ</th>
                </tr>
              </thead>
              <tbody>
                {salesByDealer.map((item, index) => (
                  <tr key={index}>
                    <td>{item.dealerName}</td>
                    <td>{item.region}</td>
                    <td className="quantity">{item.quantity}</td>
                    <td className="amount">{formatCurrency(item.totalSales)}</td>
                    <td>
                      <div className="progress-cell">
                        <span>{item.progress}%</span>
                        <div className="mini-progress">
                          <div 
                            className="mini-progress-fill" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportType === 'inventory' && (
        <div className="report-section">
          <h2>Báo cáo tồn kho</h2>
          <div className="inventory-grid">
            {inventoryStatus.map((item, index) => (
              <div key={index} className={`inventory-card ${item.status}`}>
                <h3>{item.vehicleName}</h3>
                <div className="inventory-stock">
                  <span className="stock-number">{item.stock}</span>
                  <span className="stock-label">xe</span>
                </div>
                <span className={`stock-status ${item.status}`}>
                  {item.status === 'low' && 'Tồn kho thấp'}
                  {item.status === 'medium' && 'Tồn kho trung bình'}
                  {item.status === 'high' && 'Tồn kho tốt'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {reportType === 'debt' && (
        <div className="report-section">
          <h2>Báo cáo công nợ</h2>
          {isEVM ? (
            <div className="report-table">
              <table>
                <thead>
                  <tr>
                    <th>Đại lý</th>
                    <th>Khu vực</th>
                    <th>Công nợ</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDealers.map(dealer => (
                    <tr key={dealer.id}>
                      <td>{dealer.name}</td>
                      <td>{dealer.region}</td>
                      <td className="amount">{formatCurrency(dealer.debt)}</td>
                      <td>
                        <span className={`debt-status ${dealer.debt > 50000000000 ? 'high' : 'normal'}`}>
                          {dealer.debt > 50000000000 ? 'Cao' : 'Bình thường'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="debt-summary">
              <div className="debt-card">
                <h3>Tổng công nợ khách hàng</h3>
                <p className="debt-amount">
                  {formatCurrency(125000000)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
