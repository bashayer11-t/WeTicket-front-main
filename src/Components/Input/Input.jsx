import React, { forwardRef } from 'react'; // 1. أضفنا forwardRef هنا
import styles from './Input.module.css';

// 2. قمنا بتغليف المكون بـ forwardRef وتلقي الـ ref كباراميتر ثاني
const Input = forwardRef(({ icon: Icon, error, className, name, ...props }, ref) => {
  return (
    <div className={`${styles['input-wrapper']} ${className || ''}`}>
      <div className={styles['input-group']}>
        {/* الأيقونة داخل الحاوية الخاصة بها */}
        {Icon && (
          <div className={styles['icon-container']}>
            <Icon size={18} />
          </div>
        )}
        
        <input 
          name={name}
          {...props} 
          ref={ref} /* 3. هذا هو الإضافة الأهم ليعمل مع React Hook Form */
          /* إضافة كلاس with-icon تلقائياً إذا وجدت أيقونة */
          className={`${styles['neo-input']} ${Icon ? styles['with-icon'] : ''} ${error ? styles['error-border'] : ''}`} 
        />
      </div>

      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
});

export default Input;
