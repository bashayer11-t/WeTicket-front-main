import React from 'react';
import Chart from 'react-apexcharts';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    // إعدادات الرسم البياني (التنسيق والألوان)
    const chartOptions = {
        chart: {
            id: 'tickets-sales',
            toolbar: { show: false }, // إخفاء شريط الأدوات لشكل أنظف
            fontFamily: 'inherit',
        },
        colors: ['#5b3e81'], // استخدام اللون الأساسي الخاص بك
        xaxis: {
            categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
            labels: { style: { colors: '#5b3e81' } }
        },
        stroke: { curve: 'smooth' }, // خط انسيابي
        dataLabels: { enabled: false },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        title: {
            text: 'إحصائيات مبيعات التذاكر',
            align: 'right',
            style: { color: '#5b3e81', fontSize: '18px' }
        }
    };

    const chartSeries = [{
        name: 'التذاكر المباعة',
        data: [30, 40, 35, 50, 49]
    }];

    return (
        <div className={styles['dashboard-container']}>
            <div className={styles['header-section']}>
                <h2>مرحباً بك في لوحة التحكم</h2>
                <p>إليك نظرة عامة على أداء WeTicket اليوم</p>
            </div>

            {/* منطقة الرسم البياني */}
            <div className={styles['chart-card']}>
                <Chart 
                    options={chartOptions} 
                    series={chartSeries} 
                    type="area" 
                    height={350} 
                />
            </div>
        </div>
    );
};

export default Dashboard;

