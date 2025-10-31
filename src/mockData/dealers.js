// Mock dealer data
export const mockDealers = [
  {
    id: 1,
    name: 'Đại lý Hà Nội',
    code: 'HN001',
    address: '123 Đường Láng, Đống Đa, Hà Nội',
    phone: '024-1234-5678',
    email: 'hanoi@dealer.com',
    manager: 'XYZ',
    region: 'Miền Bắc',
    status: 'active',
    contractDate: '2024-01-15',
    salesTarget: 500000000000,
    currentSales: 342000000000,
    debt: 45000000000
  },
  {
    id: 2,
    name: 'Đại lý TP.HCM',
    code: 'HCM001',
    address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028-9876-5432',
    email: 'hcm@dealer.com',
    manager: 'BCD',
    region: 'Miền Nam',
    status: 'active',
    contractDate: '2024-02-20',
    salesTarget: 600000000000,
    currentSales: 478000000000,
    debt: 32000000000
  },
  {
    id: 3,
    name: 'Đại lý Đà Nẵng',
    code: 'DN001',
    address: '789 Trần Phú, Hải Châu, Đà Nẵng',
    phone: '0236-3456-789',
    email: 'danang@dealer.com',
    manager: 'ABC',
    region: 'Miền Trung',
    status: 'active',
    contractDate: '2024-03-10',
    salesTarget: 400000000000,
    currentSales: 289000000000,
    debt: 28000000000
  }
];

export const mockDealerInventory = [
  { dealerId: 1, vehicleId: 1, quantity: 15, reservedQuantity: 3 },
  { dealerId: 1, vehicleId: 2, quantity: 8, reservedQuantity: 2 },
  { dealerId: 1, vehicleId: 4, quantity: 20, reservedQuantity: 5 },
  { dealerId: 2, vehicleId: 1, quantity: 12, reservedQuantity: 1 },
  { dealerId: 2, vehicleId: 2, quantity: 10, reservedQuantity: 3 },
  { dealerId: 2, vehicleId: 3, quantity: 7, reservedQuantity: 2 },
  { dealerId: 3, vehicleId: 1, quantity: 10, reservedQuantity: 2 },
  { dealerId: 3, vehicleId: 4, quantity: 18, reservedQuantity: 4 }
];
