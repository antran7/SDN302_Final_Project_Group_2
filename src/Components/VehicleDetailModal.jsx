import React from 'react';
import { X } from 'lucide-react';
import '../Styles/modal.css';

const VehicleDetailModal = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chi tiết xe - {vehicle.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-image">
            <img 
              src={`https://via.placeholder.com/600x400?text=${vehicle.name}`} 
              alt={vehicle.name}
            />
          </div>

          <div className="detail-grid">
            <div className="detail-section">
              <h3>Thông tin cơ bản</h3>
              <div className="detail-row">
                <span className="detail-label">Tên xe:</span>
                <span className="detail-value">{vehicle.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Model:</span>
                <span className="detail-value">{vehicle.model}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phiên bản:</span>
                <span className="detail-value">{vehicle.version}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Loại xe:</span>
                <span className="detail-value">{vehicle.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Số chỗ ngồi:</span>
                <span className="detail-value">{vehicle.seats} chỗ</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Thông số kỹ thuật</h3>
              <div className="detail-row">
                <span className="detail-label">Dung lượng pin:</span>
                <span className="detail-value">{vehicle.battery}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phạm vi hoạt động:</span>
                <span className="detail-value">{vehicle.range}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Công suất động cơ:</span>
                <span className="detail-value">{vehicle.motor}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Giá & Tồn kho</h3>
              <div className="detail-row">
                <span className="detail-label">Giá bán lẻ:</span>
                <span className="detail-value highlight">{formatCurrency(vehicle.price)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Giá sỉ:</span>
                <span className="detail-value">{formatCurrency(vehicle.wholesalePrice)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tồn kho:</span>
                <span className="detail-value">{vehicle.stock} xe</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Trạng thái:</span>
                <span className={`status-badge ${vehicle.status}`}>
                  {vehicle.status === 'available' ? 'Có sẵn' : 'Hết hàng'}
                </span>
              </div>
            </div>

            <div className="detail-section full-width">
              <h3>Màu sắc</h3>
              <div className="color-chips">
                {vehicle.colors.map((color, index) => (
                  <span key={index} className="color-chip">{color}</span>
                ))}
              </div>
            </div>

            <div className="detail-section full-width">
              <h3>Tính năng</h3>
              <ul className="features-list">
                {vehicle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailModal;
