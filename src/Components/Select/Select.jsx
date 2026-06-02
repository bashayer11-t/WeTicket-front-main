// Select.jsx
import React, { forwardRef } from 'react';
import styles from '../Input/Input.module.css'; // نستخدم نفس استايل الانبوت

const Select = forwardRef(({ options, error, ...props }, ref) => {
    return (
        <div className={styles['input-wrapper']}>
            <div className={styles['input-group']}>
                <select 
                    ref={ref}
                    className={styles['neo-input']} // نفس الكلاس لتوحيد الشكل
                    {...props}
                >
                    {options.map((opt, index) => (
                        <option key={index} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <span className={styles['error-message']}>{error}</span>}
        </div>
    );
});

export default Select;
