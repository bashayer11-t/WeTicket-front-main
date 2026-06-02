import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./RegisterSchema"; 
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react"; 
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Register.module.css"; 
import registerImage from '../../assets/background.avif'; 
import { useState } from "react";
import { registerUser } from "../../Services/AuthService.js"; 

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(""); 
    console.log("البيانات المرسلة:", data);
    
    try {
      
      await registerUser(data); 
      
      
      navigate("/login");
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
      
      const msg = error.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        
        <div className={styles.imageSection}>
          <img src={registerImage} alt="Register Background" className={styles.heroImage} />
        </div>

        <div className={styles.formSection}>
          <h1 className={styles.title}>إنشاء حساب</h1>
          <p className={styles.subtitle}>أهلاً بك! قم بتعبئة بياناتك للبدء</p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            
            
            {errorMessage && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{errorMessage}</p>}

            <Input 
              icon={User} 
              placeholder="اسم المستخدم" 
              {...register("username")}
              error={errors.username?.message} 
            />

            <Input 
              icon={Mail} 
              type="email" 
              placeholder="البريد الإلكتروني" 
              {...register("email")}
              error={errors.email?.message}
            />

            <Input 
              icon={User} 
              type="text" 
              placeholder="الاسم الأول" 
              {...register("firstName")}
              error={errors.firstName?.message}
            />

              <Input
              icon={User}
              type="text"
              placeholder="الاسم الأخير"
              {...register("lastName")}
              error={errors.lastName?.message}
            />

            <Input 
              icon={Lock} 
              type="password" 
              placeholder="كلمة المرور" 
              {...register("password")}
              error={errors.password?.message}
            />

            <Input 
              icon={Lock} 
              type="password" 
              placeholder="تأكيد كلمة المرور" 
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            
            <Button type="submit" loading={loading} variant="primary">
              تسجيل
            </Button>
            
            <p className={styles.loginLink}>
              لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
