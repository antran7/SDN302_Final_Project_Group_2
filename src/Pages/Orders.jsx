import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockOrders } from '../mockData/orders';
import { mockCustomers } from '../mockData/customers';
import { mockVehicles } from '../mockData/vehicles';
import { Search, Plus, Filter, Eye, Edit } from 'lucide-react';
import { toast } from 'sonner';
import '../Styles/orders.css';

const Orders = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const isEVM = user.role === 'Admin' || user.role === 'EVM Staff';

  const filteredOrders = mockOrders
    .filter(o => isEVM || o.dealerId === user.dealerId)
    .filter(o => {
      const matchesSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusText = (status) => {
    const statusMap = {
      'quotation': 'Báo giá',
      'pending_delivery': 'Chờ giao xe',
      'delivered': 'Đã giao',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const handleViewDetail = (order) => {
    const customer = mockCustomers.find(c => c.id === order.customerId);
    const vehicle = mockVehicles.find(v => v.id === order.vehicleId);
    toast.info(`Xem chi tiết đơn hàng ${order.orderNumber} - Khách hàng: ${customer?.name} - Xe: ${vehicle?.name}`);
  };

  const handleEdit = (order) => {
    toast.success(`Chức năng chỉnh sửa đơn hàng ${order.orderNumber} đang được phát triển`);
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Quản lý đơn hàng</h1>
        <button className="add-btn">
          <Plus size={20} />
          Tạo đơn hàng mới
        </button>
      </div>

      <div className="orders-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="quotation">Báo giá</option>
            <option value="pending_delivery">Chờ giao xe</option>
            <option value="delivered">Đã giao</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Xe</th>
              <th>Màu sắc</th>
              <th>Giá trị</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => {
              const customer = mockCustomers.find(c => c.id === order.customerId);
              const vehicle = mockVehicles.find(v => v.id === order.vehicleId);
              
              return (
                <tr key={order.id}>
                  <td className="order-number">{order.orderNumber}</td>
                  <td>
                    <div className="customer-cell">
                      <div>{customer?.name}</div>
                      <div className="customer-phone">{customer?.phone}</div>
                    </div>
                  </td>
                  <td>{vehicle?.name}</td>
                  <td>{order.color}</td>
                  <td className="amount">{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <span className={`payment-badge ${order.paymentMethod}`}>
                      {order.paymentMethod === 'cash' ? 'Trả thẳng' : 'Trả góp'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết" onClick={() => handleViewDetail(order)}>
                        <Eye size={18} />
                      </button>
                      <button className="btn-icon" title="Chỉnh sửa" onClick={() => handleEdit(order)}>
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy đơn hàng nào</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
