import React, { useState } from 'react';
import { mockVehicles } from '../mockData/vehicles';
import { mockDealers, mockDealerInventory } from '../mockData/dealers';
import { mockInventoryRequests } from '../mockData/orders';
import { Package, Plus, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import '../Styles/inventory.css';

const Inventory = () => {
  const [viewMode, setViewMode] = useState('overview');

  const getTotalInventory = () => {
    return mockVehicles.reduce((sum, v) => sum + v.stock, 0);
  };

  const getDealerInventory = (dealerId) => {
    return mockDealerInventory
      .filter(i => i.dealerId === dealerId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  const getVehicleDistribution = (vehicleId) => {
    return mockDealerInventory
      .filter(i => i.vehicleId === vehicleId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  const getLowStockVehicles = () => {
    return mockVehicles.filter(v => v.stock < 20);
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Quản lý tồn kho</h1>
        <button className="add-btn">
          <Plus size={20} />
          Yêu cầu bổ sung kho
        </button>
      </div>

      <div className="inventory-tabs">
        <button
          className={`tab-btn ${viewMode === 'overview' ? 'active' : ''}`}
          onClick={() => setViewMode('overview')}
        >
          Tổng quan
        </button>
        <button
          className={`tab-btn ${viewMode === 'dealers' ? 'active' : ''}`}
          onClick={() => setViewMode('dealers')}
        >
          Theo đại lý
        </button>
        <button
          className={`tab-btn ${viewMode === 'requests' ? 'active' : ''}`}
          onClick={() => setViewMode('requests')}
        >
          Yêu cầu bổ sung
        </button>
      </div>

      {viewMode === 'overview' && (
        <div className="inventory-overview">
          <div className="inventory-stats">
            <div className="stat-card">
              <Package size={32} />
              <div>
                <h3>Tổng tồn kho</h3>
                <p className="stat-number">{getTotalInventory()} xe</p>
              </div>
            </div>

            <div className="stat-card alert">
              <AlertCircle size={32} />
              <div>
                <h3>Tồn kho thấp</h3>
                <p className="stat-number">{getLowStockVehicles().length} mẫu</p>
              </div>
            </div>
          </div>

          {getLowStockVehicles().length > 0 && (
            <div className="low-stock-alert">
              <h3>
                <AlertCircle size={20} />
                Cảnh báo tồn kho thấp
              </h3>
              <div className="low-stock-list">
                {getLowStockVehicles().map(vehicle => (
                  <div key={vehicle.id} className="low-stock-item">
                    <span className="vehicle-name">{vehicle.name}</span>
                    <span className="stock-amount">{vehicle.stock} xe</span>
                    <button className="btn-restock">Bổ sung kho</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="inventory-table">
            <h3>Tồn kho theo mẫu xe</h3>
            <table>
              <thead>
                <tr>
                  <th>Mẫu xe</th>
                  <th>Kho trung tâm</th>
                  <th>Đã phân phối</th>
                  <th>Tổng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {mockVehicles.map(vehicle => {
                  const distributed = getVehicleDistribution(vehicle.id);
                  const total = vehicle.stock + distributed;
                  const status = vehicle.stock < 20 ? 'low' : vehicle.stock < 50 ? 'medium' : 'high';

                  return (
                    <tr key={vehicle.id}>
                      <td>{vehicle.name}</td>
                      <td className="stock-number">{vehicle.stock}</td>
                      <td className="stock-number">{distributed}</td>
                      <td className="stock-number total">{total}</td>
                      <td>
                        <span className={`stock-status ${status}`}>
                          {status === 'low' && (
                            <>
                              <TrendingDown size={16} />
                              Thấp
                            </>
                          )}
                          {status === 'medium' && 'Trung bình'}
                          {status === 'high' && (
                            <>
                              <TrendingUp size={16} />
                              Tốt
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'dealers' && (
        <div className="dealer-inventory">
          <h3>Tồn kho theo đại lý</h3>
          <div className="dealer-inventory-grid">
            {mockDealers.map(dealer => {
              const totalStock = getDealerInventory(dealer.id);
              const dealerItems = mockDealerInventory.filter(i => i.dealerId === dealer.id);

              return (
                <div key={dealer.id} className="dealer-inventory-card">
                  <div className="dealer-inventory-header">
                    <h4>{dealer.name}</h4>
                    <span className="total-stock">{totalStock} xe</span>
                  </div>

                  <div className="dealer-inventory-details">
                    {dealerItems.map(item => {
                      const vehicle = mockVehicles.find(v => v.id === item.vehicleId);
                      return (
                        <div key={item.vehicleId} className="inventory-item">
                          <span className="item-name">{vehicle?.name}</span>
                          <div className="item-quantities">
                            <span className="available">{item.quantity - item.reservedQuantity} sẵn</span>
                            {item.reservedQuantity > 0 && (
                              <span className="reserved">{item.reservedQuantity} đặt trước</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'requests' && (
        <div className="inventory-requests">
          <h3>Yêu cầu bổ sung kho</h3>
          <div className="requests-table">
            <table>
              <thead>
                <tr>
                  <th>Mã yêu cầu</th>
                  <th>Đại lý</th>
                  <th>Xe</th>
                  <th>Số lượng</th>
                  <th>Ngày yêu cầu</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {mockInventoryRequests.map(request => {
                  const dealer = mockDealers.find(d => d.id === request.dealerId);
                  const vehicle = mockVehicles.find(v => v.id === request.vehicleId);

                  return (
                    <tr key={request.id}>
                      <td>{request.requestNumber}</td>
                      <td>{dealer?.name}</td>
                      <td>{vehicle?.name}</td>
                      <td className="quantity">{request.quantity}</td>
                      <td>{new Date(request.requestDate).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <span className={`status-badge ${request.status}`}>
                          {request.status === 'pending' && 'Chờ duyệt'}
                          {request.status === 'approved' && 'Đã duyệt'}
                          {request.status === 'completed' && 'Đã giao'}
                          {request.status === 'rejected' && 'Từ chối'}
                        </span>
                      </td>
                      <td>
                        {request.status === 'pending' && (
                          <div className="action-buttons">
                            <button className="btn-approve">Duyệt</button>
                            <button className="btn-reject">Từ chối</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
