import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import '../Styles/modal.css';

const VehicleFormModal = ({ vehicle, onClose, onSubmit, isEdit = false }) => {
  const [formData, setFormData] = useState({
    model_name: '',
    specifications: '',
    body_type: 'SUV',
    seats: 5,
    doors: 5,
    warranty_years: 10,
    description: '',
    image_url: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (vehicle && isEdit) {
      setFormData({
        model_name: vehicle.model_name || '',
        specifications: vehicle.specifications || '',
        body_type: vehicle.body_type || 'SUV',
        seats: vehicle.seats || 5,
        doors: vehicle.doors || 5,
        warranty_years: vehicle.warranty_years || 10,
        description: vehicle.description || '',
        image_url: vehicle.image_url || ''
      });
    }
  }, [vehicle, isEdit]);

  const validateField = (name, value) => {
    switch (name) {
      case 'model_name':
        if (!value.trim()) return 'Tên mẫu xe không được để trống';
        if (value.length > 100) return 'Tên mẫu xe không được quá 100 ký tự';
        return '';
      
      case 'body_type':
        if (!['SUV', 'Sedan', 'Hatchback', 'Crossover', 'Pickup', 'MPV'].includes(value)) {
          return 'Loại thân xe không hợp lệ';
        }
        return '';

      case 'seats': {
        const seatsNum = Number(value);
        if (isNaN(seatsNum) || seatsNum < 2 || seatsNum > 12) {
          return 'Số chỗ ngồi phải từ 2 đến 12';
        }
        return '';
      }

      case 'doors': {
        const doorsNum = Number(value);
        if (isNaN(doorsNum) || doorsNum < 2 || doorsNum > 8) {
          return 'Số cửa phải từ 2 đến 8';
        }
        return '';
      }

      case 'warranty_years': {
        const warrantyNum = Number(value);
        if (isNaN(warrantyNum) || warrantyNum < 1 || warrantyNum > 20) {
          return 'Số năm bảo hành phải từ 1 đến 20';
        }
        return '';
      }

      case 'image_url':
        if (value && !isValidUrl(value)) {
          return 'URL hình ảnh không hợp lệ';
        }
        return '';

      default:
        return '';
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Xử lý các trường số
    if (['seats', 'doors', 'warranty_years'].includes(name)) {
      processedValue = value === '' ? '' : Math.max(1, parseInt(value) || 0);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin!');
      return;
    }

    // Convert số trước khi submit
    const processedData = {
      ...formData,
      seats: parseInt(formData.seats),
      doors: parseInt(formData.doors),
      warranty_years: parseInt(formData.warranty_years)
    };

    onSubmit(processedData);
  };

  const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'Crossover', 'Pickup', 'MPV'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? 'Chỉnh sửa xe' : 'Thêm xe mới'}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body vehicle-form">
          <div className="form-group">
            <label htmlFor="model_name">Tên mẫu xe *</label>
            <input
              type="text"
              id="model_name"
              name="model_name"
              value={formData.model_name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={100}
              className={errors.model_name && touched.model_name ? 'error' : ''}
              placeholder="Nhập tên mẫu xe"
            />
            {errors.model_name && touched.model_name && (
              <span className="error-message">{errors.model_name}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="body_type">Loại thân xe *</label>
              <select
                id="body_type"
                name="body_type"
                value={formData.body_type}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.body_type && touched.body_type ? 'error' : ''}
              >
                {bodyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.body_type && touched.body_type && (
                <span className="error-message">{errors.body_type}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="seats">Số chỗ ngồi</label>
              <input
                type="number"
                id="seats"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                onBlur={handleBlur}
                min="2"
                max="12"
                className={errors.seats && touched.seats ? 'error' : ''}
              />
              {errors.seats && touched.seats && (
                <span className="error-message">{errors.seats}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="doors">Số cửa</label>
              <input
                type="number"
                id="doors"
                name="doors"
                value={formData.doors}
                onChange={handleChange}
                onBlur={handleBlur}
                min="2"
                max="8"
                className={errors.doors && touched.doors ? 'error' : ''}
              />
              {errors.doors && touched.doors && (
                <span className="error-message">{errors.doors}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="warranty_years">Số năm bảo hành</label>
              <input
                type="number"
                id="warranty_years"
                name="warranty_years"
                value={formData.warranty_years}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1"
                max="20"
                className={errors.warranty_years && touched.warranty_years ? 'error' : ''}
              />
              {errors.warranty_years && touched.warranty_years && (
                <span className="error-message">{errors.warranty_years}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="specifications">Thông số kỹ thuật</label>
            <textarea
              id="specifications"
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              className={errors.specifications && touched.specifications ? 'error' : ''}
              placeholder="Nhập thông số kỹ thuật chi tiết của xe"
            />
            {errors.specifications && touched.specifications && (
              <span className="error-message">{errors.specifications}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="3"
              className={errors.description && touched.description ? 'error' : ''}
              placeholder="Nhập mô tả về xe"
            />
            {errors.description && touched.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image_url">URL Hình ảnh</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.image_url && touched.image_url ? 'error' : ''}
              placeholder="Nhập URL hình ảnh xe"
            />
            {errors.image_url && touched.image_url && (
              <span className="error-message">{errors.image_url}</span>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleFormModal;