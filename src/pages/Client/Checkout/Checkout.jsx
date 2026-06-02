import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Checkout.module.css';

// استيراد الصور من مجلد assets بناءً على هيكل ملفاتك
import applePayLogo from '../../../assets/Applepay.svg';
import visaLogo from '../../../assets/visa.svg.png';
import madaLogo from '../../../assets/Mada_Logo.svg.png';
import mastercardLogo from '../../../assets/Mastercard.png';

export default function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  
  // استقبال البيانات الممرة من الصفحة السابقة
  const initialCount = location.state?.count || 1;
  const eventName = location.state?.eventName || "بوليفارد وورلد";
  const eventImage = location.state?.eventImage || "/assets/BLVD.webp";

  // سعر التذكرة ثابت
  const pricePerTicket = 45.00;

  // State للتحكم في عدد التذاكر المختار
  const [selectedTicketCount, setSelectedTicketCount] = useState(initialCount);

  // حساب المبلغ الإجمالي تلقائياً (الحاسبة)
  const totalPrice = selectedTicketCount * pricePerTicket;

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.mainContainer}>
        
        {/* القسم الأيمن: ملخص الفعالية فقط */}
        <div className={styles.summarySection}>
          <div className={styles.eventSummaryCard}>
            <img 
              src={eventImage} 
              alt={eventName} 
              className={styles.eventThumb} 
              onError={(e) => { e.target.src = '/assets/placeholder.png'; }} 
            />
            <div className={styles.eventDetailsText}>
              <h4>{eventName}</h4>
              <p>الخميس 2 أبريل 2026 02:00 م</p>
              <p>جدة - حي الشاطئ</p>
            </div>
          </div>
        </div>

        {/* القسم الأيسر: الحاسبة وطرق الدفع المحدثة */}
        <div className={styles.formSection}>
          <div className={styles.purchaseCard}>
            <h3 className={styles.sectionTitle}>كم عدد التذاكر التي تود شرائها؟</h3>
            
            <div className={styles.selectWrapper}>
              <select 
                className={styles.ticketSelect} 
                value={selectedTicketCount}
                onChange={(e) => setSelectedTicketCount(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} تذكرة </option>
                ))}
              </select>
            </div>

            {/* حاسبة السعر */}
            <div className={styles.priceInfoContainer}>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>سعر التذكرة الواحد</span>
                <span className={styles.priceValue}>{pricePerTicket.toFixed(2)} ريال</span>
              </div>
              
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>عدد التذاكر</span>
                <span className={styles.priceValue}>{selectedTicketCount}</span>
              </div>

              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span className={styles.priceLabel}>المبلغ الإجمالي</span>
                <span className={styles.priceValue}>{totalPrice.toFixed(2)} ريال</span>
              </div>
            </div>

            <div className={styles.alertBox}>
              الرجاء تحديد عدد التذاكر المطلوبة لإتمام عملية الدفع
            </div>

            <div className={styles.paymentMethods}>
              <p>يمكنك الدفع بواسطة</p>
              <div className={styles.logos}>
                {/* استخدام الأيقونات المحدثة من مجلد assets الخاص بكِ */}
                <img src={applePayLogo} alt="Apple Pay" className={styles.paymentIcon} />
                <img src={visaLogo} alt="Visa" className={styles.paymentIcon} />
                <img src={madaLogo} alt="Mada" className={styles.paymentIcon} />
                <img src={mastercardLogo} alt="Mastercard" className={styles.paymentIcon} />
              </div>
            </div>

            <button className={`${styles.continueBtn} ${selectedTicketCount > 0 ? styles.enabled : ''}`}>
              استمرار
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
