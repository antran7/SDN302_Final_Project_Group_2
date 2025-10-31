// Mock customer data
export const mockCustomers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@gmail.com',
    address: '12 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    idNumber: '001234567890',
    dateOfBirth: '1985-05-15',
    dealerId: 1,
    status: 'active',
    createdDate: '2025-08-10'
  },
  {
    id: 2,
    name: 'Nguyễn Văn B',
    phone: '0912345678',
    email: 'tranthib@gmail.com',
    address: '45 Lê Lợi, Quận 1, TP.HCM',
    idNumber: '002345678901',
    dateOfBirth: '1990-08-20',
    dealerId: 2,
    status: 'active',
    createdDate: '2025-09-05'
  },
  {
    id: 3,
    name: 'Nguyễn Văn C',
    phone: '0923456789',
    email: 'levanc@gmail.com',
    address: '78 Hùng Vương, Hải Châu, Đà Nẵng',
    idNumber: '003456789012',
    dateOfBirth: '1988-12-10',
    dealerId: 3,
    status: 'active',
    createdDate: '2025-09-20'
  }
];

export const mockTestDrives = [
  {
    id: 1,
    customerId: 1,
    vehicleId: 2,
    dealerId: 1,
    scheduledDate: '2025-11-05',
    scheduledTime: '10:00',
    status: 'scheduled',
    notes: 'Khách muốn thử trên cao tốc'
  },
  {
    id: 2,
    customerId: 2,
    vehicleId: 3,
    dealerId: 2,
    scheduledDate: '2025-11-03',
    scheduledTime: '14:00',
    status: 'completed',
    notes: 'Khách hài lòng'
  }
];

export const mockFeedback = [
  {
    id: 1,
    customerId: 2,
    dealerId: 2,
    orderId: 2,
    rating: 5,
    comment: 'Dịch vụ tuyệt vời, nhân viên nhiệt tình',
    status: 'resolved',
    createdDate: '2025-10-15',
    type: 'feedback'
  },
  {
    id: 2,
    customerId: 1,
    dealerId: 1,
    orderId: null,
    rating: 3,
    comment: 'Thời gian chờ xe hơi lâu',
    status: 'pending',
    createdDate: '2025-10-25',
    type: 'complaint'
  }
];
