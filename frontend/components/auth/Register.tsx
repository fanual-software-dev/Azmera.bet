"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthLayout } from "./AuthLayout";
import { signupSchema, User, checkbox, checkboxSchema } from "@/src/utils/form-validation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

import { authapi } from "@/src/utils/api";





const formSchema = signupSchema.merge(checkboxSchema)
type formFileds = Omit<User, "verificationCode" | "refreshToken"> & checkbox

export default function Signup() {

  const { 
    register, 
    handleSubmit,
    setError, 
    formState:{ 
      errors, isSubmitting, isSubmitSuccessful 
    } } = useForm<formFileds>({
    resolver: zodResolver(formSchema)
    
  })

  const onSubmit : SubmitHandler<formFileds> = async (data:formFileds)=>{
    try {
      const res = await authapi('register',data)
      // console.log(res.data.message,"here is the res.data")
      if ( res.status===201 && res.data.status!==400){
        console.log(res.data,"created successfully")   
      }

      else{
        
        setError("root",{
          message: String(res.data.message)
        })
      }
    
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setError("root",{
        message
      })
    }
  }

  

  return (
    <AuthLayout 
      title="Create Your Account" 
      description="Join Azmera Bet today"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Type your name"
          className={`${errors.fullName ? "border-red-500": ""}`}
          {...register("fullName")}
        />
        { errors.fullName && <p className="text-xs text-red-500 italic font-medium">{errors.fullName.message}</p> }

        <Input
          placeholder="Phone number"
          className={`${errors.phoneNumber ? "border-red-500": ""}`}
          {...register("phoneNumber")}
        />
        { errors.phoneNumber && <p className="text-xs text-red-500 italic font-medium">{errors.phoneNumber.message}</p> }

        <Input
          placeholder="Password"
          className={`${errors.password ? "border-red-500": ""}`}
          {...register("password")}
        />
        { errors.password && <p className="text-xs text-red-500 italic font-medium">{errors.password.message}</p> }

        <Input
          placeholder="Confirm Password"
          className={`${errors.confirmPassword ? "border-red-500": ""}`}
          {...register("confirmPassword")}
        />
        { errors.confirmPassword && <p className="text-xs text-red-500 italic font-medium">{errors.confirmPassword.message}</p> }

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <Checkbox {...register("terms", {
                setValueAs: (v) => !!v,
              })} 
            />
            <span className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 underline">
                Terms and Conditions
              </Link>
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox {...register("privacy", {
                setValueAs: (v) => !!v,
              })} 
            />
            <span className="text-sm">
              I accept the{" "}
              <Link href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          { errors.privacy && <p className="text-xs text-red-500 italic font-medium">{errors.privacy.message}</p> }
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
          bg-sky-600 bg-[linear-gradient(to_top,orange_0%,orange_100%)] bg-[length:0%_100%] 
            bg-no-repeat 
            bg-top
            transition-[background-size] 
            duration-500 
            ease-in-out 
            hover:bg-[length:100%_100%]  
            text-white 
            font-[Poppins] 
            cursor-pointer 
            p-2 
            text-center 
            w-full 
            rounded-lg
          "
        >
          { isSubmitting ? <span className="loading loading-spinner loading-xl"></span> : "Register"}
          
        </button>
        { errors.root && <p className="text-xs text-red-500 italic font-medium">{errors.root.message}</p> }
      </form>
    </AuthLayout>
  );
}
