import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi'; 
import styles from './Header.module.css';
import logo from '../../assets/Logo.PNG';
import Button from '../../Components/Button/Button';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // التحقق من نوع الرتبة
  const isAdmin = userRole === "Admin";
  const isUser = userRole === "User";

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/'); 
    window.location.reload(); 
  };

  return (
    <header className={styles.header}>
      {/* 1. الشعار */}
      <div className={styles.logoSection} onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
      </div>

      {/* 2. روابط التنقل */}
      <nav className={styles.navLinks}>
        <NavLink to="/matches" className={({ isActive }) => isActive ? styles.active : ''}>المباريات</NavLink>
        <NavLink to="/concerts" className={({ isActive }) => isActive ? styles.active : ''}>الحفلات</NavLink>
        <NavLink to="/events" className={({ isActive }) => isActive ? styles.active : ''}>الفعاليات</NavLink>
      </nav>
       
      {/* 3. القسم الأيسر */}
      <div className={styles.leftSection}>
        <div className={styles.currency}>SAR | AR</div>
  
        {/* زر لوحة التحكم: يظهر إذا كان المستخدم مسجل دخول */}
        {token && (
          <Button 
            variant="primary" // استخدمت outline لتمييزه عن زر الخروج
            onClick={() => navigate(isAdmin ? '/admin' : '/client-dashboard')}
            style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '5px' }} 
          >
             <FiUser /> {isAdmin ? 'لوحة التحكم' : 'حسابي'}
          </Button>
        )}

        {/* زر الدخول أو الخروج */}
        {token ? (
          <Button 
            variant="primary" 
            onClick={handleLogout}
            className={styles.logoutBtnCustom}
          >
            <FiLogOut /> خروج
          </Button>
        ) : (
          <Button 
            variant="primary" 
            onClick={() => navigate('/login')}
          >
            تسجيل الدخول
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
