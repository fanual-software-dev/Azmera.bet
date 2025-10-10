// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { authapi } from "@/src/utils/api";
// import { User, userSchema } from "@/src/utils/form-validation";



// type AuthFormProps = {
//   type: "login" | "signup" | "forgotPassword" | "verify";
// };

// type passwordsOpened = {
//   password: boolean,
//   confirmPassword: boolean
// }

// type requestStatus = "idle" | "loading" | "success" | "error";

// export default function AuthForm({ type }: AuthFormProps) {
//   const [requestStatus, setRequestStatus] = useState<requestStatus>("idle");
//   const [eyesOpen,setEyesOpen] = useState<passwordsOpened>({
//     password: false,
//     confirmPassword: false
//   })
//   const [formData, setFormData] = useState<User>({
//     fullName: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     verificationCode: "",
//     refreshToken: ""
//   });

//   const [errorData, setErrorData] = useState<Partial<User>>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const validationResult = userSchema.safeParse(formData);
//     if (!validationResult.success) {
//       // console.error("Validation errors:", validationResult.error.issues);
//       const fieldErrors: Partial<User> = {};
//       validationResult.error.issues.forEach((issue) => {
//         const fieldName = issue.path[0] as keyof User;
//         fieldErrors[fieldName] = issue.message;
//       });
//       setErrorData(fieldErrors);
//       setRequestStatus('error');
//       return;
//     }

//     setRequestStatus('loading');
//     const res = await authapi(type, {});
//     const status = res.status.toString()
//     setRequestStatus('idle');

//     if (status.startsWith('2')) {
//         setRequestStatus('success');
//     } else {
//         setRequestStatus('error');
//     }


//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-gradient-to-b from-slate-900 via-slate-950 to-black p-16 rounded-2xl shadow-md border w-full md:w-2xl max-w-md space-y-4"
//     >
//       <h2 className="text-2xl font-bold text-center text-white">
//         {type === "login" ? "Welcome Back" : "Create Account"}
//       </h2>

//       {type === "signup" && (
//         <div>
//           <Input
//             name="fullName"
//             id="fullName"
//             placeholder="Full Name"
//             type="text"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             className="bg-white/1 border my-2  shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs"
//           />
//           {errorData.fullName && <p className="text-red-500 text-xs italic">{errorData.fullName}</p>}
//         </div>
        
//       )}

      

//       <Input 
//         name="phoneNumber"
//         id="phoneNumber"
//         placeholder="+251-xxx-xxx-xxx" 
//         type="phone"
//         value={formData.phoneNumber}
//         onChange={handleInputChange} 
//         className="bg-white/1 my-2 border shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" 
//       />
//       {errorData.phoneNumber && <p className="text-red-500 text-xs italic">{errorData.phoneNumber}</p>}
//       <div className="relative w-full flex items-center">
//         <Input
//           name="password"
//           id="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           placeholder="Password" 
//           type={`${eyesOpen.password ? "text": "password"}`} 
//           className="bg-white/1 my-2 border shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" />
//         <div className="absolute right-2">
//             {!eyesOpen.password ? <EyeOff size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, password:true})} /> : <Eye size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, password:false})}/>}

//         </div>
//       </div>
      
//       {errorData.password && <p className="text-red-500 text-xs italic">{errorData.password}</p>}

//       {type === "signup" && (
//         <div>
//           <div className="relative w-full flex items-center">
//               <Input
//                 name="confirmPassword"
//                 id="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 placeholder="Confirm Password"
//                 type={`${eyesOpen.confirmPassword ? "text": "password"}`}
//                 className="bg-white/1 border shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" />
//               <div className="absolute right-2">
//                   {!eyesOpen.confirmPassword ? <EyeOff size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, confirmPassword:true})} /> : <Eye size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, confirmPassword:false})}/>}
//               </div>
//           </div>
//           {errorData.confirmPassword && <p className="text-red-500 text-xs italic">{errorData.confirmPassword}</p>}
//         </div>
//       )}

      

//       { type === "login" && 
//         <div className="flex justify-end my-4">
//           <button className="cursor-pointer underline font-[Poppins] italic text-white text-xs">Forgot Passowrd?</button>
//         </div>
//       }

//       {
//         type==="signup" && 
//         <div className="flex flex-col gap-2 mt-8">
//           <p className="flex items-center gap-2">
//             <Input className="w-4 h-4" type="checkbox"></Input>
//             <span className="text-[11px] font-mono italics">
//               I agree to play responsibly
//             </span>
//           </p>

//           <p className="flex items-center gap-2">
//             <Input className="w-4 h-4" type="checkbox"></Input>
//             <span className="text-[11px] font-mono italics">
//               I am legally above age of 21
//             </span>
//           </p>

//           <p className="flex items-center gap-2">
//             <Input className="w-4 h-4" type="checkbox"></Input>
//             <span className="text-[11px] font-mono italics">
//               I agree to terms and conditions of this site
//             </span>
//           </p>
//         </div>
//       }


//       <Button type="submit" className={`w-full my-4 bg-sky-700 cursor-pointer`} disabled={requestStatus==='loading'}>
//         {requestStatus==='loading' ? <span className="loading loading-spinner loading-xl"></span> : type === "login" ? "Login" : "Sign Up"}
//       </Button>

      

//       <p className="text-sm text-center text-gray-50">
//         {type === "login" ? (
//           <>Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-400 hover:underline">Sign up</Link></>
//         ) : (
//           <>Already have an account? <Link href="/auth/login" className="text-blue-400 hover:underline">Login</Link></>
//         )}
//       </p>
//     </form>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  type: "login" | "signup" | "forgot";
  onSubmit?: (data: AuthFormValues) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const buttonText =
    type === "login"
      ? "Sign In"
      : type === "signup"
      ? "Create Account"
      : "Send Reset Link";

  return (
    <form onSubmit={handleSubmit(onSubmit || (() => {}))} className="space-y-4">
      <div>
        <Input
          {...register("email")}
          placeholder="Email address"
          type="email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {type !== "forgot" && (
        <div>
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
            className={`text-black ${ errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : buttonText}
      </Button>

      <div className="text-center text-sm text-gray-500">
        {type === "login" && (
          <>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
            <p>
              <Link
                href="/auth/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          </>
        )}
        {type === "signup" && (
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        )}
        {type === "forgot" && (
          <p>
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

