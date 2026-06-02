import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { 
    LuTicket, 
    LuCirclePlus, 
    LuLayers, 
    LuSettings, 
    LuCreditCard, 
    LuUsers, 
    LuCircleHelp, 
} from "react-icons/lu";

const Sidebar = () => {
    // المصفوفة تحتوي بالفعل على خيار Booking وربطه بمساره الصحيح
    const menuItems = [
        { name: 'Booking', path: '/admin/booking', icon: <LuTicket /> }, // يمكنك تسميته Booking أو Ticket حسب رغبتك
        { name: 'Event', path: '/admin/add-event', icon: <LuCirclePlus /> },
        { name: 'Category', path: '/admin/category', icon: <LuLayers /> },
        { name: 'Settings', path: '/admin/settings', icon: <LuSettings /> },
        { name: 'Payment', path: '/admin/payment', icon: <LuCreditCard /> },
        { name: 'Accounts', path: '/login', icon: <LuUsers /> },
        { name: 'Help', path: '/admin/help', icon: <LuCircleHelp /> },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles['menu-title']}>MENU</div>
            <nav>
                <ul className={styles['nav-list']}>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink 
                                to={item.path} 
                                // استخدام end لضمان دقة التفعيل (Active State)
                                end={item.path === '/admin'} 
                                className={({ isActive }) => 
                                    isActive ? `${styles['nav-item']} ${styles.active}` : styles['nav-item']
                                }
                            >
                                <div className={styles.icon}>{item.icon}</div>
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
