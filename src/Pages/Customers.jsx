import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockCustomers } from '../mockData/customers';
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmModal from '../Components/ConfirmModal';
import '../Styles/customers.css';

const Customers = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteCustomer, setDeleteCustomer] = useState(null);

  const filteredCustomers = mockCustomers
    .filter(c => c.dealerId === user.dealerId)
    .filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleViewDetail = (customer) => {
    toast.info(`Xem chi tiết khách hàng ${customer.name}`);
  };

  const handleEdit = (customer) => {
    toast.success(`Chức năng chỉnh sửa khách hàng ${customer.name} đang được phát triển`);
  };

  const handleDeleteClick = (customer) => {
    setDeleteCustomer(customer);
  };

  const handleConfirmDelete = () => {
    toast.success(`Đã xóa khách hàng ${deleteCustomer.name}`);
    setDeleteCustomer(null);
  };

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1>Quản lý khách hàng</h1>
        <button className="add-btn">
          <Plus size={20} />
          Thêm khách hàng
        </button>
      </div>

      <div className="customers-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="customers-grid">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="customer-card">
            <div className="customer-avatar">
              {customer.name.charAt(0)}
            </div>
            
            <div className="customer-info">
              <h3>{customer.name}</h3>
              
              <div className="customer-contact">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{customer.phone}</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>{customer.email}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>{customer.address}</span>
                </div>
              </div>

              <div className="customer-details">
                <div className="detail-row">
                  <span className="detail-label">CMND/CCCD:</span>
                  <span>{customer.idNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày sinh:</span>
                  <span>{new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày tạo:</span>
                  <span>{new Date(customer.createdDate).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              <div className="customer-actions">
                <button className="btn-detail" onClick={() => handleViewDetail(customer)}>
                  Xem chi tiết
                </button>
                <button className="btn-icon" onClick={() => handleEdit(customer)}>
                  <Edit size={18} />
                </button>
                <button className="btn-icon danger" onClick={() => handleDeleteClick(customer)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy khách hàng nào</p>
        </div>
      )}

      {deleteCustomer && (
        <ConfirmModal
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa khách hàng ${deleteCustomer.name}? Hành động này không thể hoàn tác.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;
