import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BookClient.module.css';
import { allEvents } from '../Events/EventSchema';

export default function BookClient() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [ticketCount, setTicketCount] = useState(1);

  // البحث عن بيانات الفعالية المختارة
  const eventData = allEvents.find(e => String(e.id) === String(id));

  if (!eventData) {
    return <div className={styles.errorContainer}>الفعالية غير موجودة</div>;
  }

  const ticketOptions = [1, 2, 3, 4, 5, '+6'];

  const handleNextStep = () => {
    navigate(`/checkout/${id}`, { 
      state: { 
        count: ticketCount,
        eventName: eventData.name,
        eventImage: eventData.image,
      } 
    });
  };

  return (
    <div className={styles.bookingPage}>
      <div className={styles.container}>
        
        {/* القسم الأيمن: صورة الفعالية */}
        <div className={styles.rightSection}>
          <img 
            src={eventData.image} 
            alt={eventData.name} 
            className={styles.mainImage} 
            onError={(e) => { e.target.src = '/assets/placeholder.png'; }} 
          />
        </div>

        {/* القسم الأيسر: كارت تفاصيل الحجز */}
        <div className={styles.leftSection}>
          <div className={styles.card}>
            
            {/* ملخص الفعالية العلوي */}
            <div className={styles.eventInfo}>
              <div className={styles.textDetails}>
                <h3>{eventData.name}</h3>
                <p>{eventData.location}</p>
              </div>
              <img src={eventData.image} alt="thumb" className={styles.thumb} />
            </div>

            <hr className={styles.divider} />

            {/* الإضافة الجديدة: منطقة التاريخ والوقت */}
            <div className={styles.dateTimeSection}>
              <div className={styles.infoRow}>
                <span className={styles.label}>التاريخ والوقت</span>
                <div className={styles.dateTimeBadge}>
                  <span className={styles.fullDate}>{eventData.date}</span>
                </div>
              </div>
            </div>

            <hr className={styles.divider} />

            {/* منطقة اختيار عدد التذاكر */}
            <div className={styles.ticketsArea}>
              <h2 className={styles.title}>عدد التذاكر</h2>
              <div className={styles.grid}>
                {ticketOptions.map((num) => (
                  <button
                    key={num}
                    className={`${styles.ticketBtn} ${ticketCount === num ? styles.active : ''}`}
                    onClick={() => setTicketCount(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* زر الخطوة التالية */}
            <button 
              className={styles.confirmBtn} 
              onClick={handleNextStep}
            >
              الخطوة التالية
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
