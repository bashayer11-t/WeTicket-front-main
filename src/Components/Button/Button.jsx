import React from 'react';
import styles from './Button.module.css';

// أضفنا children هنا لكي يظهر أي نص تكتبينه بين <Button> و </Button>
const Button = ({ text, children, onClick, type = "button", variant = "primary", disabled, loading }) => {
  return (
    <button
      // تأكدي أن styles['main-btn'] مكتوبة هكذا تماماً
      className={`${styles['main-btn']} ${styles[variant]} ${disabled || loading ? styles.disabled : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {/* سيعرض النص سواء أرسلتيه كـ text أو كتبتيه بين الوسمين */}
      {loading ? "جاري التحميل..." : (children || text)} 
    </button>
  );
};


export default Button;
