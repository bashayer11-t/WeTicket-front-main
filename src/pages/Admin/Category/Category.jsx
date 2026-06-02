import React, { useState } from 'react';
import FormModel from '../../../Components/FormModel/FormModel';
// استخدام مكون الـ Input الموحد الخاص بكِ أفضل للحفاظ على التنسيق
import Input from '../../../Components/Input/Input'; 
import styles from './Category.module.css';

const Category = () => {
    // إدارة بيانات التصنيف في Object واحد ليتوافق مع هيكلة الـ add-event
    const [categoryData, setCategoryData] = useState({
        categoryName: '',
        categoryType: 'ترفيه', 
        status: 'نشط'        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        console.log("إضافة تصنيف جديد:", categoryData);
        alert("تم إضافة التصنيف بنجاح");
    };

    return (
        <div className={styles['page-wrapper']}>
            <FormModel 
                title="إضافة تصنيف" 
                subtitle="أدخل اسم التصنيف الجديد ليظهر في القائمة"
                titleClassName={styles.customTitle} 
            >
                {/* تم تغيير الكلاس هنا ليكون مطابقاً لتنسيق add-event-form */}
                <form onSubmit={handleAddCategory} className={styles['add-event-form']}>
                    
                    {/* حقل اسم التصنيف */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>اسم التصنيف</label>
                        <Input 
                            placeholder="مثلاً: حفلات غنائية، مباريات..."
                            name="categoryName"
                            value={categoryData.categoryName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* صف يحتوي على النوع والحالة (Dropdowns) باستخدام كلاس row */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>نوع التصنيف</label>
                            <select 
                                name="categoryType" 
                                value={categoryData.categoryType}
                                onChange={handleChange}
                            >
                                <option value="ترفيه">ترفيه</option>
                                <option value="عائلي">عائلي</option>
                                <option value="ثقافي">ثقافي</option>
                                <option value="رياضي">رياضي</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>الحالة</label>
                            <select 
                                name="status" 
                                value={categoryData.status}
                                onChange={handleChange}
                            >
                                <option value="نشط">نشط</option>
                                <option value="غير نشط">غير نشط</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.buttonWrapper}>
                        <button type="submit" className={styles.submitBtn}>إضافة</button>
                    </div>
                </form>
            </FormModel>
        </div>
    );
};

export default Category;
