import { Navigate, Outlet } from "react-router";

export default function Guard() {
  // 1. نبحث عن التوكن في ذاكرة المتصفح
  const token = localStorage.getItem("token");

  // 2. إذا التوكن مو موجود (يعني مو مسجل دخول)
  if (!token) {
    // نرجعه لصفحة تسجيل الدخول فوراً
    return <Navigate to="/" replace />;
  }

  // 3. إذا التوكن موجود، نسمح له يشوف محتوى الشاشة (الـ Outlet يعرض الشاشة المطلوبة)
  return <Outlet />;
}