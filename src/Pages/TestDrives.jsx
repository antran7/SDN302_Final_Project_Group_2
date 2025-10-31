//Trang quản lý lịch lái thử
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockTestDrives, mockCustomers } from '../mockData/customers';
import { mockVehicles } from '../mockData/vehicles';
import { Calendar, Plus, Edit, CheckCircle, XCircle, Clock } from 'lucide-react';
import '../Styles/testdrives.css';

const TestDrives = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTestDrives = mockTestDrives
    .filter(td => td.dealerId === user.dealerId)
    .filter(td => statusFilter === 'all' || td.status === statusFilter);

  const getStatusText = (status) => {
    const statusMap = {
      'scheduled': 'Đã đặt lịch',
      'completed': 'Đã hoàn thành',
      'cancelled': 'Đã hủy',
      'no_show': 'Khách không đến'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="testdrives-container">
      <div className="testdrives-header">
        <h1>Quản lý lịch lái thử</h1>
        <button className="add-btn">
          <Plus size={20} />
          Đặt lịch mới
        </button>
      </div>

      <div className="testdrives-filters">
        <div className="filter-group">
          <Calendar size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="scheduled">Đã đặt lịch</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
            <option value="no_show">Khách không đến</option>
          </select>
        </div>
      </div>

      <div className="testdrives-grid">
        {filteredTestDrives.map(testDrive => {
          const customer = mockCustomers.find(c => c.id === testDrive.customerId);
          const vehicle = mockVehicles.find(v => v.id === testDrive.vehicleId);
          
          return (
            <div key={testDrive.id} className="testdrive-card">
              <div className="testdrive-header">
                <div className="testdrive-date">
                  <Calendar size={20} />
                  <div>
                    <div className="date">
                      {new Date(testDrive.scheduledDate).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="time">
                      <Clock size={14} />
                      {testDrive.scheduledTime}
                    </div>
                  </div>
                </div>
                <span className={`status-badge ${testDrive.status}`}>
                  {getStatusText(testDrive.status)}
                </span>
              </div>

              <div className="testdrive-info">
                <div className="info-section">
                  <h4>Khách hàng</h4>
                  <p>{customer?.name}</p>
                  <p className="contact">{customer?.phone}</p>
                </div>

                <div className="info-section">
                  <h4>Xe lái thử</h4>
                  <p>{vehicle?.name}</p>
                  <p className="detail">{vehicle?.version}</p>
                </div>

                {testDrive.notes && (
                  <div className="info-section">
                    <h4>Ghi chú</h4>
                    <p className="notes">{testDrive.notes}</p>
                  </div>
                )}
              </div>

              <div className="testdrive-actions">
                {testDrive.status === 'scheduled' && (
                  <>
                    <button className="btn-complete">
                      <CheckCircle size={18} />
                      Hoàn thành
                    </button>
                    <button className="btn-icon">
                      <Edit size={18} />
                    </button>
                    <button className="btn-icon danger">
                      <XCircle size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTestDrives.length === 0 && (
        <div className="empty-state">
          <p>Không có lịch lái thử nào</p>
        </div>
      )}
    </div>
  );
};

export default TestDrives;
