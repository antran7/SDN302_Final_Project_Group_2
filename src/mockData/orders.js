// Mock order data
export const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2025-001',
    customerId: 1,
    dealerId: 1,
    vehicleId: 2,
    color: 'Trắng',
    quantity: 1,
    unitPrice: 1050000000,
    discount: 0,
    totalAmount: 1050000000,
    paymentMethod: 'installment',
    downPayment: 300000000,
    installmentMonths: 48,
    status: 'pending_delivery',
    salesStaff: 'staff A',
    orderDate: '2025-10-01',
    deliveryDate: null,
    notes: 'Khách yêu cầu giao trước 15/11'
  },
  {
    id: 2,
    orderNumber: 'ORD-2025-002',
    customerId: 2,
    dealerId: 2,
    vehicleId: 3,
    color: 'Đen',
    quantity: 1,
    unitPrice: 1491000000,
    discount: 50000000,
    totalAmount: 1441000000,
    paymentMethod: 'cash',
    downPayment: 1441000000,
    installmentMonths: 0,
    status: 'delivered',
    salesStaff: 'Staff B',
    orderDate: '2025-09-15',
    deliveryDate: '2025-10-10',
    notes: ''
  },
  {
    id: 3,
    orderNumber: 'ORD-2025-003',
    customerId: 3,
    dealerId: 3,
    vehicleId: 1,
    color: 'Xanh',
    quantity: 1,
    unitPrice: 690000000,
    discount: 20000000,
    totalAmount: 670000000,
    paymentMethod: 'installment',
    downPayment: 200000000,
    installmentMonths: 36,
    status: 'quotation',
    salesStaff: 'Staff C',
    orderDate: '2025-10-20',
    deliveryDate: null,
    notes: ''
  }
];

export const mockQuotations = [
  {
    id: 1,
    quotationNumber: 'QUO-2025-001',
    customerId: 1,
    dealerId: 1,
    vehicleId: 2,
    color: 'Trắng',
    unitPrice: 1050000000,
    discount: 0,
    totalAmount: 1050000000,
    validUntil: '2025-11-15',
    status: 'converted',
    createdDate: '2025-09-25',
    createdBy: 'Phạm Thị Staff'
  },
  {
    id: 2,
    quotationNumber: 'QUO-2025-002',
    customerId: 3,
    dealerId: 3,
    vehicleId: 1,
    color: 'Xanh',
    unitPrice: 690000000,
    discount: 20000000,
    totalAmount: 670000000,
    validUntil: '2025-11-30',
    status: 'pending',
    createdDate: '2025-10-20',
    createdBy: 'Trần Văn C'
  }
];

export const mockInventoryRequests = [
  {
    id: 1,
    requestNumber: 'REQ-2025-001',
    dealerId: 1,
    vehicleId: 2,
    quantity: 5,
    requestDate: '2025-10-15',
    approvalDate: '2025-10-18',
    deliveryDate: null,
    status: 'approved',
    notes: 'Đơn hàng nhiều, cần bổ sung'
  },
  {
    id: 2,
    requestNumber: 'REQ-2025-002',
    dealerId: 3,
    vehicleId: 4,
    quantity: 10,
    requestDate: '2025-10-20',
    approvalDate: null,
    deliveryDate: null,
    status: 'pending',
    notes: 'Chuẩn bị cho chiến dịch khuyến mãi'
  }
];
