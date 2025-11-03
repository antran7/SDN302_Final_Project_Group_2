import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  GitCompare,
  Loader2,
} from 'lucide-react';
import VehicleDetailModal from '../Components/VehicleDetailModal';
import VehicleFormModal from '../Components/VehicleFormModal';
import ConfirmModal from '../Components/ConfirmModal';
import { vehiclesService } from '../services/vehicles.service';
import { toast } from 'sonner';
import '../Styles/vehicles.css';
import '../Styles/loading.css';
import '../Styles/form.css';

const Vehicles = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compareMode, setCompareMode] = useState(false);
  const [compareVehicles, setCompareVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null);
  const [deleteVehicle, setDeleteVehicle] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const isEVM = user.role === 'ADMIN' || user.role === 'EVM_STAFF';
  const isDEALER = user.role === 'DEALER_MANAGER' || user.role === 'DEALER_STAFF';

  // Tải danh sách xe
  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const vehiclesData = await vehiclesService.getVehicles();
      setVehicles(vehiclesData);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleViewDetail = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle);
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleDeleteClick = (vehicle) => {
    setDeleteVehicle(vehicle);
  };

  const handleSubmitAdd = async (formData) => {
    try {
      await vehiclesService.createVehicle(formData);
      toast.success('Thêm xe mới thành công');
      setShowAddForm(false);
      loadVehicles(); // Tải lại danh sách xe
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmitEdit = async (formData) => {
    try {
      await vehiclesService.updateVehicle(editVehicle._id, formData);
      toast.success(`Đã cập nhật thông tin xe ${formData.model_name}`);
      setEditVehicle(null);
      loadVehicles(); // Tải lại danh sách xe
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await vehiclesService.deleteVehicle(deleteVehicle._id);
      toast.success(`Đã xóa xe ${deleteVehicle.modelName}`);
      setDeleteVehicle(null);
      loadVehicles(); // Tải lại danh sách xe
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.modelName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || vehicle.body_type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCompare = (vehicle) => {
    if (compareVehicles.find((v) => v.vehicle_id === vehicle._id)) {
      setCompareVehicles(compareVehicles.filter((v) => v.vehicle_id !== vehicle._id));
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
          {isDEALER && (
            <button className="add-btn" onClick={handleAdd}>
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
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Crossover">Crossover</option>
            <option value="Pickup">Pickup</option>
            <option value="MPV">MPV</option>
          </select>
        </div>
      </div>

      {compareMode && compareVehicles.length > 0 && (
        <div className="compare-banner">
          <span>Đã chọn {compareVehicles.length}/3 xe để so sánh</span>
          {compareVehicles.length >= 2 && (
            <button className="view-compare-btn">Xem so sánh</button>
          )}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={48} />
          <p>Đang tải danh sách xe...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadVehicles} className="retry-btn">
            Thử lại
          </button>
        </div>
      ) : (
        <div className="vehicles-grid">
          {filteredVehicles.map((vehicle) => {
            const isComparing = compareVehicles.find(
              (v) => v.vehicle_id === vehicle._id
            );

            return (
              <div
                key={vehicle._id}
                className={`vehicle-card ${isComparing ? 'comparing' : ''}`}
              >
                <div className="vehicle-image">
                  <img
                    src={
                      vehicle.imageUrl ||
                      `https://via.placeholder.com/400x250?text=${vehicle.modelName}`
                    }
                    alt={vehicle.modelName}
                  />
                  {compareMode && (
                    <button
                      className={`compare-checkbox ${
                        isComparing ? 'checked' : ''
                      }`}
                      onClick={() => toggleCompare(vehicle)}
                    >
                      {isComparing && '✓'}
                    </button>
                  )}
                </div>

                <div className="vehicle-info">
                  <div className="vehicle-header">
                    <h3>{vehicle.modelName}</h3>
                    <p className="vehicle-type">{vehicle.bodyType}</p>
                  </div>

                  <div className="vehicle-specs">
                    <div className="spec-item">
                      <span className="spec-label">Số chỗ</span>
                      <span className="spec-value">{vehicle.seats} chỗ</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Số cửa</span>
                      <span className="spec-value">{vehicle.doors} cửa</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Bảo hành</span>
                      <span className="spec-value">
                        {vehicle.warrantyYears} năm
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Thông số</span>
                      <span className="spec-value">Chi tiết</span>
                    </div>
                  </div>

                  {vehicle.description && (
                    <p className="vehicle-description">{vehicle.description}</p>
                  )}

                  <div className="vehicle-actions">
                    <button
                      className="btn-detail"
                      onClick={() => handleViewDetail(vehicle)}
                    >
                      Chi tiết
                    </button>
                    {isDEALER && (
                      <>
                        <button
                          className="btn-icon"
                          onClick={() => handleEdit(vehicle)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="btn-icon danger"
                          onClick={() => handleDeleteClick(vehicle)}
                        >
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
      )}

      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {showAddForm && (
        <VehicleFormModal
          onClose={() => setShowAddForm(false)}
          onSubmit={handleSubmitAdd}
        />
      )}

      {editVehicle && (
        <VehicleFormModal
          vehicle={editVehicle}
          isEdit={true}
          onClose={() => setEditVehicle(null)}
          onSubmit={handleSubmitEdit}
        />
      )}

      {deleteVehicle && (
        <ConfirmModal
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa xe ${deleteVehicle.modelName}? Hành động này không thể hoàn tác.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteVehicle(null)}
        />
      )}
    </div>
  );
};

export default Vehicles;
