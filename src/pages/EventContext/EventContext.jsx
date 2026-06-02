import React, { createContext, useState, useContext, useEffect } from 'react';
import { allEvents } from '../Client/Events/EventSchema';

// 1. تعريف الـ Context (هذا السطر اللي كان ناقص ويسبب الخطأ الأخير)
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    // 2. محاولة تحميل البيانات من LocalStorage أو استخدام allEvents كقيمة افتراضية
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('weticket_events');
        // تأكدي أننا نستخدم allEvents هنا بدلاً من initialEvents
        return savedEvents ? JSON.parse(savedEvents) : allEvents;
    });

    // حفظ التغييرات في المتصفح تلقائياً عند تحديث قائمة الفعاليات
    useEffect(() => {
        localStorage.setItem('weticket_events', JSON.stringify(events));
    }, [events]);

    // دالة إضافة فعالية جديدة
    const addEvent = (newEvent) => {
        const eventWithId = { ...newEvent, id: events.length + 1 };
        setEvents([...events, eventWithId]);
    };

    return (
        // 3. توفير البيانات والدوال لكل المكونات الأبناء
        <EventContext.Provider value={{ events, addEvent }}>
            {children}
        </EventContext.Provider>
    );
};

// 4. Hook مخصص لتسهيل استدعاء البيانات في الصفحات الأخرى
export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};