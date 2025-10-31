import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { mockFeedback, mockCustomers } from '../mockData/customers';
import { MessageSquare, Star, CheckCircle, Clock } from 'lucide-react';
import '../Styles/feedback.css';

const Feedback = () => {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFeedback = mockFeedback
    .filter(f => f.dealerId === user.dealerId)
    .filter(f => {
      const matchesType = typeFilter === 'all' || f.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
      return matchesType && matchesStatus;
    });

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#fbbf24' : 'none'}
        stroke={i < rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  const getTypeText = (type) => {
    return type === 'feedback' ? 'Phản hồi' : 'Khiếu nại';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Chờ xử lý',
      'in_progress': 'Đang xử lý',
      'resolved': 'Đã giải quyết'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Phản hồi & Khiếu nại</h1>
      </div>

      <div className="feedback-filters">
        <div className="filter-group">
          <MessageSquare size={20} />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Tất cả loại</option>
            <option value="feedback">Phản hồi</option>
            <option value="complaint">Khiếu nại</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="in_progress">Đang xử lý</option>
            <option value="resolved">Đã giải quyết</option>
          </select>
        </div>
      </div>

      <div className="feedback-list">
        {filteredFeedback.map(feedback => {
          const customer = mockCustomers.find(c => c.id === feedback.customerId);
          
          return (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-card-header">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {customer?.name.charAt(0)}
                  </div>
                  <div>
                    <h4>{customer?.name}</h4>
                    <p className="customer-phone">{customer?.phone}</p>
                  </div>
                </div>
                <div className="feedback-meta">
                  <span className={`type-badge ${feedback.type}`}>
                    {getTypeText(feedback.type)}
                  </span>
                  <span className={`status-badge ${feedback.status}`}>
                    {getStatusText(feedback.status)}
                  </span>
                </div>
              </div>

              <div className="feedback-rating">
                <span>Đánh giá:</span>
                <div className="stars">
                  {renderStars(feedback.rating)}
                </div>
              </div>

              <div className="feedback-comment">
                <p>{feedback.comment}</p>
              </div>

              <div className="feedback-footer">
                <span className="feedback-date">
                  {new Date(feedback.createdDate).toLocaleDateString('vi-VN')}
                </span>
                {feedback.status === 'pending' && (
                  <button className="btn-resolve">
                    <CheckCircle size={16} />
                    Đánh dấu đã giải quyết
                  </button>
                )}
                {feedback.status === 'in_progress' && (
                  <span className="in-progress-indicator">
                    <Clock size={16} />
                    Đang xử lý
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="empty-state">
          <p>Không có phản hồi hoặc khiếu nại nào</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
