import api from './config';

export const vehiclesService = {
    // Lấy danh sách xe
    getVehicles: async (params = {}) => {
        try {
            const response = await api.get('/vehicles', { params });
            console.log("Data ne: ", response.data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải danh sách xe' };
        }
    },

    // Lấy chi tiết một xe
    getVehicleById: async (id) => {
        try {
            const response = await api.get(`/vehicles/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải thông tin xe' };
        }
    },

    // Thêm xe mới
    createVehicle: async (vehicleData) => {
        try {
            const response = await api.post('/vehicles', vehicleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể thêm xe mới' };
        }
    },

    // Cập nhật thông tin xe
    updateVehicle: async (id, vehicleData) => {
        try {
            const response = await api.put(`/vehicles/${id}`, vehicleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể cập nhật thông tin xe' };
        }
    },

    // Xóa xe
    deleteVehicle: async (id) => {
        try {
            const response = await api.delete(`/vehicles/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể xóa xe' };
        }
    },

    // Lấy toàn bộ khuyến mãi
    getAllPromotions: async () => {
        try {
            const response = await api.get(`/promotions`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải thông tin khuyến mãi' };
        }
    },

    // Lấy khuyến mãi của 1 xe cụ thể
    getVehiclePromotions: async (vehicleId) => {
        try {
            const response = await api.get(`/vehicles/${vehicleId}/promotions`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Không thể tải thông tin khuyến mãi' };
        }
    }
};