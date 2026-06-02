import api from './api.js';

// دالة تسجيل الدخول
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/Auth/Login', credentials);
        return response;
    } catch (error) {
        throw error;
    }
};

// دالة تسجيل حساب جديد
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/Auth/Register', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

// دالة تسجيل الخروج
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};
