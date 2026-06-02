import React, { useState } from 'react';
import FormModel from '../../../Components/FormModel/FormModel';
import Input from '../../../Components/Input/Input'; 
import styles from './Booking.module.css';

const Booking = () => {
    const [bookingData, setBookingData] = useState({
        ticketNumber: '',
        eventName: '',
        eventStatus: 'قادمة', 
        price: '',
        date: '', // الحقل الجديد
        paymentStatus: 'نشط'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBooking = (e) => {
        e.preventDefault();
        console.log("بيانات الحجز المرسلة للباكيند:", bookingData);
        alert("تم إضافة بيانات الحجز بنجاح");
    };

    return (
        <div className={styles['page-wrapper']}>
            <FormModel title="إضافة حجز" titleClassName={styles.customTitle}>
                <form onSubmit={handleAddBooking} className={styles['add-event-form']}>
                    
                    {/* رقم التذكرة */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>رقم التذكرة</label>
                        <Input 
                            placeholder="1101"
                            name="ticketNumber"
                            value={bookingData.ticketNumber}
                            onChange={handleChange}
                        />
                    </div>

                    {/* اسم الفعالية */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>اسم الفعالية</label>
                        <Input 
                            placeholder="بوليفارد وورلد - الرياض"
                            name="eventName"
                            value={bookingData.eventName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* التاريخ واليوم - الحقل الجديد */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>التاريخ واليوم</label>
                        <Input 
                            type="date"
                            name="date"
                            value={bookingData.date}
                            onChange={handleChange}
                        />
                    </div>

                    {/* حالة الفعالية (Dropdown) */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>حالة الفعالية</label>
                        <select 
                            name="eventStatus" 
                            value={bookingData.eventStatus}
                            onChange={handleChange}
                        >
                            <option value="قادمة">قادمة</option>
                            <option value="انتهت">انتهت</option>
                        </select>
                    </div>

                    {/* السعر */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>السعر</label>
                        <Input 
                            placeholder="45.00 ريال"
                            name="price"
                            type="number"
                            value={bookingData.price}
                            onChange={handleChange}
                        />
                    </div>

                    {/* حالة الدفع (Dropdown) */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>حالة الدفع</label>
                        <select 
                            name="paymentStatus" 
                            value={bookingData.paymentStatus}
                            onChange={handleChange}
                        >
                            <option value="نشط">نشط</option>
                            <option value="غير نشط">غير نشط</option>
                        </select>
                    </div>
                    
                    <div className={styles.buttonWrapper}>
                        <button type="submit" className={styles.submitBtn}>إضافة</button>
                    </div>
                </form>
            </FormModel>
        </div>
    );
};

export default Booking;
