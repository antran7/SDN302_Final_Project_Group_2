//Trang quản lý đại lý (EVM)
import React, { useState } from 'react';
import { mockDealers } from '../mockData/dealers';
import { Search, Plus, Edit, Eye, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import '../Styles/dealers.css';

const Dealers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDealers = mockDealers.filter(dealer =>
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const calculateProgress = (current, target) => {
    return Math.round((current / target) * 100);
  };

  const handleViewDetail = (dealer) => {
    toast.info(`Xem chi tiết đại lý ${dealer.name}`);
  };

  const handleEdit = (dealer) => {
    toast.success(`Chức năng chỉnh sửa đại lý ${dealer.name} đang được phát triển`);
  };

  return (
    <div className="dealers-container">
      <div className="dealers-header">
        <h1>Quản lý đại lý</h1>
        <button className="add-btn">
          <Plus size={20} />
          Thêm đại lý mới
        </button>
      </div>

      <div className="dealers-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm đại lý..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="dealers-grid">
        {filteredDealers.map(dealer => {
          const progress = calculateProgress(dealer.currentSales, dealer.salesTarget);
          
          return (
            <div key={dealer.id} className="dealer-card">
              <div className="dealer-header-card">
                <div className="dealer-title">
                  <h3>{dealer.name}</h3>
                  <span className="dealer-code">{dealer.code}</span>
                </div>
                <span className={`dealer-status ${dealer.status}`}>
                  {dealer.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </span>
              </div>

              <div className="dealer-info">
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{dealer.address}</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>{dealer.phone}</span>
                </div>
                <div className="info-item">
                  <Mail size={16} />
                  <span>{dealer.email}</span>
                </div>
              </div>

              <div className="dealer-stats">
                <div className="stat-item">
                  <span className="stat-label">Quản lý:</span>
                  <span className="stat-value">{dealer.manager}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Khu vực:</span>
                  <span className="stat-value">{dealer.region}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Hợp đồng:</span>
                  <span className="stat-value">
                    {new Date(dealer.contractDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              <div className="dealer-performance">
                <div className="performance-header">
                  <span>Tiến độ doanh số</span>
                  <span className="performance-percent">{progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="performance-details">
                  <span>Hiện tại: {formatCurrency(dealer.currentSales)}</span>
                  <span>Mục tiêu: {formatCurrency(dealer.salesTarget)}</span>
                </div>
              </div>

              <div className="dealer-debt">
                <span className="debt-label">Công nợ:</span>
                <span className="debt-amount">{formatCurrency(dealer.debt)}</span>
              </div>

              <div className="dealer-actions">
                <button className="btn-detail" onClick={() => handleViewDetail(dealer)}>
                  <Eye size={18} />
                  Xem chi tiết
                </button>
                <button className="btn-icon" onClick={() => handleEdit(dealer)}>
                  <Edit size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDealers.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy đại lý nào</p>
        </div>
      )}
    </div>
  );
};

export default Dealers;
