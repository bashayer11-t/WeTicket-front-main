import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Event.module.css';
import { allEvents } from "./EventSchema";

const Event = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id) {
    const eventData = allEvents.find(e => String(e.id) === String(id));
    if (!eventData) return <div className={styles.notFound}>عذراً، الفعالية غير موجودة!</div>;

    const handleConfirmBooking = () => {
      navigate(`/book-event/${id}`);
    };

    return (
      <div className={styles.detailsContainer}>
        {/* الحاوية الرئيسية مقسمة لجزئين */}
        <div className={styles.contentLayout}>
          
          {/* جزء المعلومات (يمين) */}
          <div className={styles.infoSection}>
            <h1 className={styles.mainTitle}>{eventData.name}</h1>
            
            <div className={styles.grayTextContent}>
              <p className={styles.locationTag}>{eventData.location}</p>
              
              <div className={styles.metaInfo}>
                <div className={styles.infoItem}>
                  <span>التاريخ:</span>
                  <strong>{eventData.date}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>السعر يبدأ من:</span>
                  <strong>{eventData.price} ريال</strong>
                </div>
              </div>

              <div className={styles.descriptionBox}>
                <h5>عن الفعالية</h5>
                <p>{eventData.description}</p>
              </div>
            </div>

            <button 
              className={styles.bookNowBtn} 
              onClick={handleConfirmBooking}
            >
              تأكيد الحجز
            </button>
          </div>

          {/* جزء الصورة (يسار) بأبعاد طولية متناسقة */}
          <div className={styles.imageWrapper}>
            <img src={eventData.image} alt={eventData.name} />
          </div>

        </div>
      </div>
    );
  }

  // ... (قسم Grid View يظل كما هو)
};

export default Event;
