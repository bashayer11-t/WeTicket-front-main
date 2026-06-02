import api from './api';

export const EventService = {
  // جلب كل الفعاليات
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  // جلب فعالية واحدة بالـ ID
  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  }
};
