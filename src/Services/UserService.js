import api from './api'; // استيراد إعدادات axios الخاصة بمشروعك

// جلب بيانات ملف المستخدم
export const getUserProfile = async () => {
    return await api.get('/Account/profile'); 
};

// تحديث بيانات المستخدم
export const updateUserProfile = async (userData) => {
    return await api.put('/Account/update-profile', userData);
};
