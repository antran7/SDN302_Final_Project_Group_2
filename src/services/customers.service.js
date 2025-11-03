import api from './config';

export const customersService = {
    // Lấy danh sách khách hàng
    getCustomers: async (params = {}) => {
        try {
            const response = await api.get('/customers', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải danh sách khách hàng' };
        }
    },

    // Lấy thông tin chi tiết một khách hàng
    getCustomerById: async (id) => {
        try {
            const response = await api.get(`/customers/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải thông tin khách hàng' };
        }
    },

    // Thêm khách hàng mới
    createCustomer: async (customerData) => {
        try {
            const response = await api.post('/customers', customerData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể thêm khách hàng mới' };
        }
    },

    // Cập nhật thông tin khách hàng
    updateCustomer: async (id, customerData) => {
        try {
            const response = await api.put(`/customers/${id}`, customerData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể cập nhật thông tin khách hàng' };
        }
    },

    // Xóa khách hàng
    deleteCustomer: async (id) => {
        try {
            const response = await api.delete(`/customers/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể xóa khách hàng' };
        }
    },

    // Lấy danh sách khách hàng của một đại lý
    getCustomersByDealer: async (dealerId) => {
        try {
            const response = await api.get(`/dealers/${dealerId}/customers`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải danh sách khách hàng của đại lý' };
        }
    }
};