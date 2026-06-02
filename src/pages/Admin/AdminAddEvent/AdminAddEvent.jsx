import React, { useState } from "react";
import styles from './AdminAddEvent.module.css';
import Input from "/src/Components/Input/Input";
import Button from "/src/Components/Button/Button";
import Select from "/src/Components/Select/Select";
import FormModel from "/src/Components/FormModel/FormModel";

const AdminAddEvent = () => {
    const [eventData, setEventData] = useState({
        eventId: '', name: '', date: '', location: '', price: '', capacity: '', category: '', status: '', description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles['page-wrapper']} id="full-width-container">
            <FormModel 
                title="إضافة فعالية" 
                subtitle="أكمل البيانات لإدراج فعالية جديدة"
                titleClassName={styles.customTitle}
            >
                <form className={styles['add-event-form']}>
                    {/* الصف الأول */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>رقم الفعالية</label>
                            <Input placeholder="ID الفعالية" name="eventId" value={eventData.eventId} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>اسم الفعالية</label>
                            <Input placeholder="اسم الفعالية..." name="name" value={eventData.name} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>  التاريخ واليوم</label>
                            <Input type="date" name="date" value={eventData.date} onChange={handleChange} />
                        </div>
                    </div>

                    {/* الصف الثاني */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>الموقع</label>
                            <Input placeholder="مثال: الرياض" name="location" value={eventData.location} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>السعر</label>
                            <Input type="number" placeholder="0.00" name="price" value={eventData.price} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>السعة</label>
                            <Input type="number" placeholder="مثلاً: 500" name="capacity" value={eventData.capacity} onChange={handleChange} />
                        </div>
                    </div>

                    {/* الصف الثالث */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>التصنيف</label>
                            <Select name="category" options={[{label:"ترفيه", value:"1"}]} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>الحالة</label>
                            <Select name="status" options={[{label:"قادمة", value:"active"}]} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>وصف مختصر</label>
                            <Input placeholder="تفاصيل..." name="description" value={eventData.description} onChange={handleChange} />
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

export default AdminAddEvent;
