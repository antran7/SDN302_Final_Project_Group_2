import api from './config';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Đã có lỗi xảy ra' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Đã có lỗi xảy ra' };
        }
    }
};