import React, { useState, useEffect } from 'react';
import styles from './ClientDashboard.module.css';
import { getUserProfile, updateUserProfile } from '../../../Services/UserService';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // 1. تعريف حالة البيانات (State) شاملة حقل التأكيد
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 2. جلب البيانات من الـ API عند تحميل الصفحة
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile();
        // مواءمة البيانات القادمة من الباك إند مع الـ State
        setFormData(prev => ({
          ...prev,
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          username: response.data.userName || '',
          email: response.data.email || ''
        }));
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };

    fetchUserData();
  }, []);

  // 3. دالة تحديث الـ State عند الكتابة
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 4. دالة الحفظ مع التحقق من كلمة المرور
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التأكد من تطابق كلمة المرور (في حال أدخل المستخدم شيئاً)
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة!");
      return;
    }

    try {
      await updateUserProfile(formData);
      alert("تم حفظ التغييرات بنجاح!");
      // تصفير حقول كلمة المرور بعد النجاح
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      console.error("فشل التحديث:", error);
      alert("حدث خطأ أثناء تحديث البيانات.");
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>لوحة التحكم</h3>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          المعلومات الشخصية
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'bookings' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          حجوزاتي
        </button>
      </aside>

      <main className={styles.content}>
        {activeTab === 'profile' ? (
          <section>
            <h2>تعديل البيانات الشخصية</h2>
            <form className={styles.profileForm} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>الاسم الأول</label>
                  <input 
                    name="firstName"
                    type="text" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="الاسم الأول" 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>الاسم الأخير</label>
                  <input 
                    name="lastName"
                    type="text" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="الاسم الأخير" 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>اسم المستخدم (لا يمكن تعديله)</label>
                  <input 
                    type="text" 
                    value={formData.username} 
                    readOnly 
                    className={styles.readOnlyInput} 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>البريد الإلكتروني</label>
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com" 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>كلمة المرور الجديدة</label>
                  <input 
                    name="password"
                    type="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********" 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>تأكيد كلمة المرور</label>
                  <input 
                    name="confirmPassword"
                    type="password" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="أعد كتابة كلمة المرور" 
                  />
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>حفظ التغييرات</button>
            </form>
          </section>
        ) : (
          <section>
            <h2>الفعاليات التي حجزت فيها</h2>
            <p style={{color: '#5b3e81', marginRight: '15px'}}>لا توجد حجوزات حالياً.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
