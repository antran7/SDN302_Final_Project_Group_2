import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { customersService } from '../services/customers.service';
import ConfirmModal from '../Components/ConfirmModal';
import '../Styles/customers.css';

const Customers = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteCustomer, setDeleteCustomer] = useState(null);

  // Tải danh sách khách hàng
  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (user.role === 'Dealer Staff') {
        // Nếu là nhân viên đại lý, chỉ lấy khách hàng của đại lý đó
        data = await customersService.getCustomersByDealer(user.dealer_id);
      } else {
        // Nếu là admin hoặc nhân viên EVM, lấy tất cả khách hàng
        data = await customersService.getCustomers();
      }
      setCustomers(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [user.role, user.dealer_id]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const filteredCustomers = customers.filter(customer => 
    customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewDetail = async (customer) => {
    try {
      const customerDetail = await customersService.getCustomerById(customer.customer_id);
      // TODO: Hiển thị modal chi tiết với customerDetail
      toast.info(`Xem chi tiết khách hàng ${customerDetail.full_name}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (customer) => {
    // TODO: Implement edit functionality
    toast.info(`Chức năng chỉnh sửa khách hàng ${customer.full_name} đang được phát triển`);
  };

  const handleDeleteClick = (customer) => {
    setDeleteCustomer(customer);
  };

  const handleConfirmDelete = async () => {
    try {
      await customersService.deleteCustomer(deleteCustomer.customer_id);
      toast.success(`Đã xóa khách hàng ${deleteCustomer.full_name}`);
      setDeleteCustomer(null);
      loadCustomers(); // Tải lại danh sách sau khi xóa
    } catch (err) {
      toast.error(err.message);
    }
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

      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={48} />
          <p>Đang tải danh sách khách hàng...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => loadCustomers()} className="retry-btn">
            Thử lại
          </button>
        </div>
      ) : (
        <>
          <div className="customers-grid">
            {filteredCustomers.map(customer => (
              <div key={customer.customer_id} className="customer-card">
                <div className="customer-avatar">
                  {customer.full_name.charAt(0)}
                </div>
                
                <div className="customer-info">
                  <h3>{customer.full_name}</h3>
                  
                  <div className="customer-contact">
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{customer.phone}</span>
                    </div>
                    {customer.email && (
                      <div className="contact-item">
                        <Mail size={16} />
                        <span>{customer.email}</span>
                      </div>
                    )}
                    {customer.address && (
                      <div className="contact-item">
                        <MapPin size={16} />
                        <span>{customer.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="customer-details">
                    <div className="detail-row">
                      <span className="detail-label">Mã KH:</span>
                      <span>#{customer.customer_id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Mã đại lý:</span>
                      <span>#{customer.dealer_id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Ngày tạo:</span>
                      <span>{new Date(customer.created_at).toLocaleDateString('vi-VN')}</span>
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
        </>
      )}

      {deleteCustomer && (
        <ConfirmModal
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa khách hàng ${deleteCustomer.full_name}? Hành động này không thể hoàn tác.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;
