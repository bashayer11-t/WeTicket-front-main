import { z } from "zod"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "الاسم الأخير مطلوب"),
  username: z.string().min(1, "اسم المستخدم مطلوب").min(4, "اسم المستخدم يجب أن يكون 4 أحرف على الأقل"),
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("أدخل بريداً إلكترونياً صالحاً"),
  password: z.string().min(1, "كلمة المرور مطلوبة").regex(passwordRegex, "كلمة المرور يجب أن تحتوي على عدد من الأحرف الكبيرة والصغيرة والأرقام والرموز"),
});


export default RegisterSchema;