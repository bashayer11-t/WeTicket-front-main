import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './Components/Layout/ClientLayout/ClientLayout';
import Home from './Pages/Client/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Events from './Pages/Client/Events/Event'; 
import Dashboard from './Pages/Admin/Dashboard/Dashboard'; 
import AdminAddEvent from './Pages/Admin/AdminAddEvent/AdminAddEvent.jsx';
import Category from './Pages/Admin/Category/Category'; 
import { EventProvider } from './Pages/EventContext/EventContext';
import AdminLayout from './Pages/Admin/AdminLayout/AdminLayout.jsx';
import Booking from './Pages/Admin/Booking/Booking.jsx';
import BookClient from './Pages/Client/BookClient/BookClient.jsx';
import Checkout from './Pages/Client/Checkout/Checkout.jsx';

// استيراد المكون الجديد للوحة تحكم العميل
import ClientDashboard from './Pages/Client/ClientDashboard/ClientDashboard.jsx';

/**
 * 1. حارس مسارات الأدمن
 */
const ProtectedAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("role"); 
  const token = localStorage.getItem("token"); 

  if (!token || userRole !== "Admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * 2. حارس مسارات العميل (جديد)
 * يسمح فقط لمن يحمل رتبة User بالدخول
 */
const ProtectedUserRoute = ({ children }) => {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || userRole !== "User") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <EventProvider>
      <Router>
        <Routes>
          {/* 1. مسارات العميل العامة والخاصة */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/matches" element={<Events type="matches" />} /> 
            <Route path="/concerts" element={<Events type="concerts" />} />
            <Route path="/event/:id" element={<Events />} />
            <Route path="/book-event/:id" element={<BookClient />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />

            
            {/* مسار لوحة تحكم العميل المحمية */}
            <Route 
              path="/my-dashboard" 
              element={
                <ProtectedUserRoute>
                  <ClientDashboard />
                </ProtectedUserRoute>
              } 
            />
          </Route>

          {/* 2. مسارات مستقلة */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 3. مسارات لوحة تحكم الأدمن - محمية */}
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Dashboard />} /> 
            <Route path="dashboard" element={<Dashboard />} /> 
            <Route path="add-event" element={<AdminAddEvent />} />
            <Route path="booking" element={<Booking />} />
            <Route path="category" element={<Category />} /> 
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* 4. معالجة الروابط غير الموجودة */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;
