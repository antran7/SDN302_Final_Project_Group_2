import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockVehicles, mockPromotions } from '../mockData/vehicles';
import { Search, Filter, Plus, Edit, Trash2, GitCompare } from 'lucide-react';
import VehicleDetailModal from '../Components/VehicleDetailModal';
import ConfirmModal from '../Components/ConfirmModal';
import { toast } from 'sonner';
import '../Styles/vehicles.css';

const Vehicles = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compareMode, setCompareMode] = useState(false);
  const [compareVehicles, setCompareVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteVehicle, setDeleteVehicle] = useState(null);

  const isEVM = user.role === 'Admin' || user.role === 'EVM Staff';

  const handleViewDetail = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEdit = (vehicle) => {
    toast.success(`Chức năng chỉnh sửa xe ${vehicle.name} đang được phát triển`);
  };

  const handleDeleteClick = (vehicle) => {
    setDeleteVehicle(vehicle);
  };

  const handleConfirmDelete = () => {
    toast.success(`Đã xóa xe ${deleteVehicle.name}`);
    setDeleteVehicle(null);
  };

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getActivePromotions = (vehicleId) => {
    return mockPromotions.filter(p => 
      p.vehicleIds.includes(vehicleId) &&
      new Date(p.endDate) >= new Date()
    );
  };

  const toggleCompare = (vehicle) => {
    if (compareVehicles.find(v => v.id === vehicle.id)) {
      setCompareVehicles(compareVehicles.filter(v => v.id !== vehicle.id));
    } else if (compareVehicles.length < 3) {
      setCompareVehicles([...compareVehicles, vehicle]);
    }
  };

  return (
    <div className="vehicles-container">
      <div className="vehicles-header">
        <h1>{isEVM ? 'Quản lý xe điện' : 'Danh mục xe điện'}</h1>
        <div className="vehicles-actions">
          <button 
            className={`compare-btn ${compareMode ? 'active' : ''}`}
            onClick={() => {
              setCompareMode(!compareMode);
              setCompareVehicles([]);
            }}
          >
            <GitCompare size={20} />
            So sánh xe
          </button>
          {isEVM && (
            <button className="add-btn">
              <Plus size={20} />
              Thêm xe mới
            </button>
          )}
        </div>
      </div>

      <div className="vehicles-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm xe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tất cả loại</option>
            <option value="SUV">SUV</option>
            <option value="SUV 7 chỗ">SUV 7 chỗ</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>
      </div>

      {compareMode && compareVehicles.length > 0 && (
        <div className="compare-banner">
          <span>Đã chọn {compareVehicles.length}/3 xe để so sánh</span>
          {compareVehicles.length >= 2 && (
            <button className="view-compare-btn">
              Xem so sánh
            </button>
          )}
        </div>
      )}

      <div className="vehicles-grid">
        {filteredVehicles.map(vehicle => {
          const promotions = getActivePromotions(vehicle.id);
          const isComparing = compareVehicles.find(v => v.id === vehicle.id);

          return (
            <div 
              key={vehicle.id} 
              className={`vehicle-card ${isComparing ? 'comparing' : ''}`}
            >
              <div className="vehicle-image">
                <img 
                  src={`https://via.placeholder.com/400x250?text=${vehicle.name}`} 
                  alt={vehicle.name}
                />
                {promotions.length > 0 && (
                  <div className="promotion-badge">
                    Khuyến mãi
                  </div>
                )}
                {compareMode && (
                  <button 
                    className={`compare-checkbox ${isComparing ? 'checked' : ''}`}
                    onClick={() => toggleCompare(vehicle)}
                  >
                    {isComparing && '✓'}
                  </button>
                )}
              </div>

              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p className="vehicle-version">{vehicle.version} - {vehicle.category}</p>

                <div className="vehicle-specs">
                  <div className="spec-item">
                    <span className="spec-label">Pin:</span>
                    <span className="spec-value">{vehicle.battery}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Phạm vi:</span>
                    <span className="spec-value">{vehicle.range}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Động cơ:</span>
                    <span className="spec-value">{vehicle.motor}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Chỗ ngồi:</span>
                    <span className="spec-value">{vehicle.seats} chỗ</span>
                  </div>
                </div>

                <div className="vehicle-colors">
                  <span>Màu sắc:</span>
                  <div className="color-list">
                    {vehicle.colors.map(color => (
                      <span key={color} className="color-badge">{color}</span>
                    ))}
                  </div>
                </div>

                {isEVM ? (
                  <div className="vehicle-prices">
                    <div className="price-row">
                      <span>Giá bán lẻ:</span>
                      <span className="price">{formatCurrency(vehicle.price)}</span>
                    </div>
                    <div className="price-row">
                      <span>Giá sỉ:</span>
                      <span className="price wholesale">{formatCurrency(vehicle.wholesalePrice)}</span>
                    </div>
                    <div className="price-row">
                      <span>Tồn kho:</span>
                      <span className="stock">{vehicle.stock} xe</span>
                    </div>
                  </div>
                ) : (
                  <div className="vehicle-price">
                    <span className="price-label">Giá bán:</span>
                    <span className="price">{formatCurrency(vehicle.price)}</span>
                  </div>
                )}

                {promotions.length > 0 && (
                  <div className="vehicle-promotions">
                    {promotions.map(promo => (
                      <div key={promo.id} className="promo-item">
                        {promo.discount > 0 
                          ? `Giảm ${formatCurrency(promo.discount)}`
                          : `Giảm ${promo.discountPercent}%`
                        }
                      </div>
                    ))}
                  </div>
                )}

                <div className="vehicle-actions">
                  <button className="btn-detail" onClick={() => handleViewDetail(vehicle)}>
                    Chi tiết
                  </button>
                  {isEVM && (
                    <>
                      <button className="btn-icon" onClick={() => handleEdit(vehicle)}>
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon danger" onClick={() => handleDeleteClick(vehicle)}>
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedVehicle && (
        <VehicleDetailModal 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
        />
      )}

      {deleteVehicle && (
        <ConfirmModal
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa xe ${deleteVehicle.name}? Hành động này không thể hoàn tác.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteVehicle(null)}
        />
      )}
    </div>
  );
};

export default Vehicles;
