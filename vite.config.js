import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import os from 'os' // مكتبة مدمجة لمعرفة نظام التشغيل

dotenv.config()

// تحديد رابط الباك إند تلقائياً بناءً على نظام التشغيل
const isWindows = os.platform() === 'win32';
const backendTarget = isWindows 
  ? 'https://localhost:7110' // رابط جهاز جود (الويندوز)
  : 'http://localhost:5241'; // رابط جهازكِ (الماك)

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    // الـ Proxy يقوم بتحويل مسار /api تلقائياً إلى البورت الصحيح حسب الجهاز
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
        secure: false, // لتخطي مشاكل الـ SSL الحماية على اللوكال هيد
      }
    }
  }
})
