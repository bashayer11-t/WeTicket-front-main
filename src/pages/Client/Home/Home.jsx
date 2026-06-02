import React, { useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import Card from '../../../Components/Card/Card'; 
import { Link } from 'react-router-dom';

// استيراد الأيقونات من مكتبة react-icons (Material Design)
import { MdEventSeat, MdPayment, MdConfirmationNumber, MdCelebration } from 'react-icons/md';

// استيراد الصور
import blvdImg from '../../../assets/BLVD.webp'; 
import winterImg from '../../../assets/winterwonderland.jpeg'; 
import globalImg from '../../../assets/GLOBAL.webp';  

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const allEvents = [
    { id: 1, name: "بوليفارد وورلد", location: "الرياض", image: blvdImg },
    { id: 2, name: "ونتر وندر لاند", location: "الرياض", image: winterImg },
    { id: 3, name: "قلوبال سيتي", location: "الدمام", image: globalImg }
  ];

  // بيانات خطوات الطلب
  const steps = [
    { id: 1, title: "اختر مقعدك", icon: <MdEventSeat size={45} /> },
    { id: 2, title: "ادفع", icon: <MdPayment size={45} /> },
    { id: 3, title: "استقبل تذكرتك", icon: <MdConfirmationNumber size={45} /> },
    { id: 4, title: "استمتع بالفعالية", icon: <MdCelebration size={45} /> }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* 1. قسم البحث */}
      <section className={styles.searchSection}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      {/* 2. قسم أفضل الخيارات */}
      <div className={styles.contentWrapper}>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>أفضل الخيارات</h2>
          <div className={styles.eventsGrid}>
            {allEvents
              .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase())) 
              .map(event => (
                <Link key={event.id} to={`/event/${event.id}`} className={styles.cardLink}>
                  <Card 
                    title={event.name} 
                    location={event.location} 
                    image={event.image} 
                  />
                </Link>
              ))
            }
          </div>
        </section>

        {/* 3. قسم كيف أطلب تذكرتي؟ (الإضافة الجديدة) */}
        <section className={styles.howToOrderSection}>
          <h2 className={styles.sectionTitleCenter}>كيف أطلب تذكرتي؟</h2>
          <p className={styles.sectionSubtitle}>بشكل آمن 100%.. اطلب من وخليك مرتاح</p>
          
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div key={step.id} className={styles.stepCard}>
                <div className={styles.iconWrapper}>
                  {step.icon}
                </div>
                <p className={styles.stepTitle}>{step.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
