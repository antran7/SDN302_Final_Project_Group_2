// Mock users for authentication
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    name: 'Nguyễn Văn Admin',
    email: 'admin@evm.com',
    avatar: null
  },
  {
    id: 2,
    username: 'evmstaff',
    password: 'evm123',
    role: 'EVM Staff',
    name: 'Staff EVM',
    email: 'staff@evm.com',
    avatar: null
  },
  {
    id: 3,
    username: 'dealer1',
    password: 'dealer123',
    role: 'Dealer Manager',
    name: 'Staff Dealer',
    email: 'manager@dealer1.com',
    dealerId: 1,
    dealerName: 'Đại lý Hà Nội',
    avatar: null
  },
  {
    id: 4,
    username: 'staff1',
    password: 'staff123',
    role: 'Dealer Staff',
    name: 'Staff A',
    email: 'staff@dealer1.com',
    dealerId: 1,
    dealerName: 'Đại lý Hà Nội',
    avatar: null
  }
];
