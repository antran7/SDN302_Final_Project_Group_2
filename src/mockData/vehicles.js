// Mock vehicle data
export const mockVehicles = [
  {
    id: 1,
    name: 'VinFast VF e34',
    model: 'VF e34',
    version: 'Plus',
    category: 'SUV',
    price: 690000000,
    wholesalePrice: 650000000,
    colors: ['Trắng', 'Đen', 'Xanh', 'Đỏ'],
    battery: '42 kWh',
    range: '285 km',
    motor: '110 kW',
    seats: 5,
    features: ['Màn hình 10 inch', 'Camera 360', 'Cảm biến lùi', 'Kết nối điện thoại'],
    image: null,
    status: 'available',
    stock: 45
  },
  {
    id: 2,
    name: 'VinFast VF 8',
    model: 'VF 8',
    version: 'Eco',
    category: 'SUV',
    price: 1050000000,
    wholesalePrice: 980000000,
    colors: ['Trắng', 'Đen', 'Xám', 'Xanh'],
    battery: '87.7 kWh',
    range: '420 km',
    motor: '260 kW',
    seats: 5,
    features: ['Màn hình 15.6 inch', 'Camera 360', 'Lái tự động Level 2', 'Sạc nhanh'],
    image: null,
    status: 'available',
    stock: 28
  },
  {
    id: 3,
    name: 'VinFast VF 9',
    model: 'VF 9',
    version: 'Plus',
    category: 'SUV 7 chỗ',
    price: 1491000000,
    wholesalePrice: 1400000000,
    colors: ['Trắng', 'Đen', 'Xám'],
    battery: '123 kWh',
    range: '594 km',
    motor: '300 kW',
    seats: 7,
    features: ['Màn hình 15.6 inch', 'Camera 360', 'Lái tự động Level 2+', 'Ghế massage'],
    image: null,
    status: 'available',
    stock: 15
  },
  {
    id: 4,
    name: 'VinFast VF 5',
    model: 'VF 5',
    version: 'Plus',
    category: 'Hatchback',
    price: 468000000,
    wholesalePrice: 440000000,
    colors: ['Trắng', 'Đen', 'Xanh', 'Đỏ', 'Vàng'],
    battery: '37.23 kWh',
    range: '326 km',
    motor: '100 kW',
    seats: 5,
    features: ['Màn hình 8 inch', 'Camera lùi', 'Kết nối điện thoại', 'Cảm biến hỗ trợ'],
    image: null,
    status: 'available',
    stock: 62
  }
];

export const mockPromotions = [
  {
    id: 1,
    name: 'Ưu đãi tháng 10',
    vehicleIds: [1, 4],
    discount: 20000000,
    discountPercent: 0,
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    description: 'Giảm giá 20 triệu cho VF e34 và VF 5'
  },
  {
    id: 2,
    name: 'Khuyến mãi cuối năm',
    vehicleIds: [2, 3],
    discount: 0,
    discountPercent: 5,
    startDate: '2025-10-15',
    endDate: '2025-12-31',
    description: 'Giảm 5% cho VF 8 và VF 9'
  }
];
