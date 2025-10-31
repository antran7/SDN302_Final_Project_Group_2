//Trang quản lý báo giá
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockQuotations } from '../mockData/orders';
import { mockCustomers } from '../mockData/customers';
import { mockVehicles } from '../mockData/vehicles';
import { Search, Plus, Eye, Edit, FileText, CheckCircle, XCircle } from 'lucide-react';
import '../Styles/quotations.css';

const Quotations = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotations = mockQuotations
    .filter(q => q.dealerId === user.dealerId)
    .filter(q => {
      const matchesSearch = q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
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
      'pending': 'Chờ phản hồi',
      'accepted': 'Đã chấp nhận',
      'rejected': 'Đã từ chối',
      'converted': 'Đã chuyển đơn',
      'expired': 'Hết hạn'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="quotations-container">
      <div className="quotations-header">
        <h1>Quản lý báo giá</h1>
        <button className="add-btn">
          <Plus size={20} />
          Tạo báo giá mới
        </button>
      </div>

      <div className="quotations-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm báo giá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FileText size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ phản hồi</option>
            <option value="accepted">Đã chấp nhận</option>
            <option value="rejected">Đã từ chối</option>
            <option value="converted">Đã chuyển đơn</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>
      </div>

      <div className="quotations-table">
        <table>
          <thead>
            <tr>
              <th>Mã báo giá</th>
              <th>Khách hàng</th>
              <th>Xe</th>
              <th>Màu sắc</th>
              <th>Giá trị</th>
              <th>Ngày tạo</th>
              <th>Hạn báo giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotations.map(quotation => {
              const customer = mockCustomers.find(c => c.id === quotation.customerId);
              const vehicle = mockVehicles.find(v => v.id === quotation.vehicleId);
              const isExpired = new Date(quotation.validUntil) < new Date();
              
              return (
                <tr key={quotation.id}>
                  <td className="quotation-number">{quotation.quotationNumber}</td>
                  <td>
                    <div className="customer-cell">
                      <div>{customer?.name}</div>
                      <div className="customer-phone">{customer?.phone}</div>
                    </div>
                  </td>
                  <td>{vehicle?.name}</td>
                  <td>{quotation.color}</td>
                  <td className="amount">{formatCurrency(quotation.totalAmount)}</td>
                  <td>{new Date(quotation.createdDate).toLocaleDateString('vi-VN')}</td>
                  <td className={isExpired ? 'expired-date' : ''}>
                    {new Date(quotation.validUntil).toLocaleDateString('vi-VN')}
                  </td>
                  <td>
                    <span className={`status-badge ${quotation.status}`}>
                      {getStatusText(quotation.status)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết">
                        <Eye size={18} />
                      </button>
                      {quotation.status === 'pending' && (
                        <>
                          <button className="btn-icon success" title="Chấp nhận">
                            <CheckCircle size={18} />
                          </button>
                          <button className="btn-icon" title="Chỉnh sửa">
                            <Edit size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredQuotations.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy báo giá nào</p>
        </div>
      )}
    </div>
  );
};

export default Quotations;
