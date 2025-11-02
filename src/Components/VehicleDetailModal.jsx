import React from 'react';
import { X } from 'lucide-react';
import '../Styles/modal.css';

const VehicleDetailModal = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const formatDate = (iso) => {
    if (!iso) return '-';
    try {
      const d = new Date(iso);
      return d.toLocaleString('vi-VN');
    } catch {
      return iso;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chi tiết xe - {vehicle.modelName || vehicle._id}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-image">
            <img
              src={vehicle.imageUrl || `https://via.placeholder.com/800x450?text=${encodeURIComponent(vehicle.modelName || 'Vehicle')}`}
              alt={vehicle.modelName || 'vehicle'}
            />
          </div>

          <div className="detail-grid">
            <div className="detail-section">
              <h3>Thông tin cơ bản</h3>
              <div className="detail-row">
                <span className="detail-label">Mã:</span>
                <span className="detail-value">{vehicle._id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tên mẫu:</span>
                <span className="detail-value">{vehicle.modelName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Loại thân xe:</span>
                <span className="detail-value">{vehicle.bodyType || '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Số chỗ:</span>
                <span className="detail-value">{vehicle.seats ?? '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Số cửa:</span>
                <span className="detail-value">{vehicle.doors ?? '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Bảo hành:</span>
                <span className="detail-value">{vehicle.warranty_years ?? '-'} năm</span>
              </div>
            </div>

            <div className="detail-section full-width">
              <h3>Thông số / Mô tả</h3>
              {vehicle.specifications ? (
                <pre className="detail-pre">{vehicle.specifications}</pre>
              ) : vehicle.description ? (
                <p className="detail-text">{vehicle.description}</p>
              ) : (
                <p className="detail-text">Không có thông tin mô tả.</p>
              )}
            </div>

            <div className="detail-section">
              <h3>Metadata</h3>
              <div className="detail-row">
                <span className="detail-label">Tạo lúc:</span>
                <span className="detail-value">{formatDate(vehicle.created_at)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cập nhật:</span>
                <span className="detail-value">{formatDate(vehicle.updated_at)}</span>
              </div>
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
