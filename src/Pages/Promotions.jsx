//Trang quản lý khuyến mãi
import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockPromotions, mockVehicles } from '../mockData/vehicles';
import { Percent, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import '../Styles/promotions.css';

const Promotions = () => {
  const { user } = useAuth();
  const isEVM = user.role === 'Admin' || user.role === 'EVM Staff';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isActive = (promotion) => {
    const now = new Date();
    const start = new Date(promotion.startDate);
    const end = new Date(promotion.endDate);
    return now >= start && now <= end;
  };

  return (
    <div className="promotions-container">
      <div className="promotions-header">
        <h1>{isEVM ? 'Quản lý chính sách khuyến mãi' : 'Khuyến mãi hiện có'}</h1>
        {isEVM && (
          <button className="add-btn">
            <Plus size={20} />
            Tạo khuyến mãi mới
          </button>
        )}
      </div>

      <div className="promotions-grid">
        {mockPromotions.map(promotion => {
          const active = isActive(promotion);
          const applicableVehicles = mockVehicles.filter(v => 
            promotion.vehicleIds.includes(v.id)
          );

          return (
            <div key={promotion.id} className={`promotion-card ${active ? 'active' : 'inactive'}`}>
              <div className="promotion-header">
                <div className="promotion-icon">
                  <Percent size={32} />
                </div>
                <span className={`promotion-status ${active ? 'active' : 'inactive'}`}>
                  {active ? 'Đang áp dụng' : 'Hết hạn'}
                </span>
              </div>

              <h3>{promotion.name}</h3>
              <p className="promotion-description">{promotion.description}</p>

              <div className="promotion-value">
                {promotion.discount > 0 ? (
                  <>
                    <span className="discount-label">Giảm giá:</span>
                    <span className="discount-amount">
                      {formatCurrency(promotion.discount)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="discount-label">Giảm:</span>
                    <span className="discount-amount">
                      {promotion.discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <div className="promotion-period">
                <Calendar size={16} />
                <span>
                  {new Date(promotion.startDate).toLocaleDateString('vi-VN')}
                  {' - '}
                  {new Date(promotion.endDate).toLocaleDateString('vi-VN')}
                </span>
              </div>

              <div className="promotion-vehicles">
                <h4>Áp dụng cho:</h4>
                <div className="vehicles-list">
                  {applicableVehicles.map(vehicle => (
                    <span key={vehicle.id} className="vehicle-tag">
                      {vehicle.name}
                    </span>
                  ))}
                </div>
              </div>

              {isEVM && (
                <div className="promotion-actions">
                  <button className="btn-icon">
                    <Edit size={18} />
                  </button>
                  <button className="btn-icon danger">
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mockPromotions.length === 0 && (
        <div className="empty-state">
          <p>Không có chương trình khuyến mãi nào</p>
        </div>
      )}
    </div>
  );
};

export default Promotions;
