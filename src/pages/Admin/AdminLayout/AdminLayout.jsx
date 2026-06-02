import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Header from '../../../Components/Header/Header';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
    return (
        <div className={styles.layoutContainer}>
            {/* 1. الهيدر في الأعلى تماماً وممتد */}
            <Header /> 
            
            {/* 2. حاوية تجمع السايد بار والمحتوى تحت الهيدر */}
            <div className={styles.bodyWrapper}>
                <Sidebar />
                <main className={styles.contentArea}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
