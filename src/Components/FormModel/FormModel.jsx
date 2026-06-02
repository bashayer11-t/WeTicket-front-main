import React, { useState, useEffect } from 'react'; // استيراد الـ Hooks المطلوبة
import styles from './FormModel.module.css';

const FormModel = ({ title, subtitle, children, titleClassName }) => {
    // 1. استخدام useState لإدارة حالة إظهار النموذج
    const [isVisible, setIsVisible] = useState(false);

    // 2. استخدام useEffect لتنفيذ تأثير حركي بسيط عند ظهور المكون
    useEffect(() => {
        // بمجرد تحميل المكون، نجعله مرئياً
        setIsVisible(true);
        console.log("FormModel component has mounted.");
    }, []);

    // إذا كانت الحالة false (قبل التفعيل)، لا نعرض شيئاً أو نعرض شيئاً بسيطاً
    if (!isVisible) return null;

    return (
        <div className={styles['form-container']}>
            <div className={styles['form-card']}>
                {/* هنا أضفنا استخدام الـ Hooks لجعل المكون تفاعلياً 
                    titleClassName تحكماً كاملاً هنا ليعطيك 
                */}
                <h1 className={`${styles['form-title']} ${titleClassName || ''}`}>
                    {title}
                </h1>

                {subtitle && (
                    <div className={styles['form-subtitle']}>
                        {subtitle}
                    </div>
                )}

                <div className={styles['form-content']}>
                    {children}
                </div>

                {/* زر بسيط لاستخدام الحالة (State) في الإغلاق مثلاً */}
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{ marginTop: '20px', cursor: 'pointer' }}
                >
                    إخفاء النموذج
                </button>
            </div>
        </div>
    );
};

export default FormModel;
