import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "./LoginSchema";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Login.module.css";
import loginImage from '../../assets/background.avif';
import { useState } from "react";
import { loginUser } from "../../Services/AuthService.js"; 

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(""); 

    try {
      const response = await loginUser(data);
      
      // التعديل لضمان قراءة البيانات بشكل صحيح سواء من Axios أو الاستجابة المباشرة
      const result = response.data ? response.data : response;

      if (result && result.token) {
        // تخزين التوكن
        localStorage.setItem("token", result.token);

        // استخراج الرتبة بأمان من المصفوفة roles
        // الباك إند يرسل مصفوفة، نأخذ العنصر الأول منها ليتعرف عليه الهيدر
        const userRole = (result.roles && result.roles.length > 0) ? result.roles[0] : "User";
        localStorage.setItem("role", userRole);

        // التوجيه بناءً على الرتبة المستخرجة
        if (userRole === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        navigate 
        setTimeout(() => { 
          window.location.reload(); // تحديث الصفحة لضمان قراءة الهيدر للبيانات الجديدة فوراً
        }, 100);
      }

        // تحديث الصفحة لضمان قراءة الهيدر للبيانات الجديدة فوراً
        window.location.reload();
      }

     catch (error) {
      console.error("Login Error:", error);
      const msg = error.response?.data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.imageSection}>
          <img src={loginImage} alt="Background" className={styles.heroImage} />
        </div>

        <div className={styles.formSection}>
          <h1 className={styles.title}>مرحباً !</h1>
          <p className={styles.subtitle}>أكمل لتسجيل الدخول </p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {errorMessage && <p className={styles.errorMessage} style={{color: 'red', textAlign: 'center'}}>{errorMessage}</p>}
            
            <Input 
              type="text" 
              placeholder="البريد الإلكتروني" 
              {...register("email")} 
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

            <Input 
              type="password" 
              placeholder="كلمة المرور" 
              {...register("password")} 
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
            
           <Button type="submit" loading={loading} variant="primary" className={styles.submitBtn}>
             تسجيل الدخول
            </Button>

            <p className={styles.registerLink}>
              ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
