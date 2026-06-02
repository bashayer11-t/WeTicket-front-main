import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";
// إذا لم يكن لديكِ ملف فوتر بعد، يمكنكِ إنشاء مجلد له في Components
// import Footer from "../../Footer/Footer"; 

export default function ClientLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* 1. الهيدر في أعلى الصفحة */}
      <Header />

      {/* 2. منطقة المحتوى المتغير (Outlet) */}
      <main style={{ flex: 1, padding: "20px" }}>
        <section style={{ marginTop: "20px" }}>
          <Outlet />
        </section>
      </main>

      {/* 3. الفوتر في أسفل الصفحة */}
      <footer style={{ padding: "20px", textAlign: "center", backgroundColor: "#fff", borderTop: "1px solid #e5e7eb" }}>
        <p>© 2026 WeTicket - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
