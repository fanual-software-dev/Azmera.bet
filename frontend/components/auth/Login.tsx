"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthLayout } from "./AuthLayout";
import { signupSchema, User } from "@/src/utils/form-validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { da } from "zod/v4/locales";
import { authapi } from "@/src/utils/api";





type formFileds = Pick<User, "phoneNumber" | "password">

export default function Login() {

  const { 
    register, 
    handleSubmit,
    setError, 
    formState:{ 
      errors, isSubmitting, isSubmitSuccessful 
    } } = useForm<formFileds>({
    resolver: zodResolver(signupSchema)
    
  })

  const onSubmit : SubmitHandler<formFileds> = async (data:formFileds)=>{
    try {
      const res = await authapi('login',data)
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
      title="Welcome Back 👋" 
      description="Log in to your Azmera Bet account"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

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

        <p className="text-right italic text-sky-600 underline text-sm cursor-pointer">
          Forgot Password?
        </p>
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
          { isSubmitting ? <span className="loading loading-spinner loading-xl"></span> : "Login"}
          
        </button>
        { errors.root && <p className="text-xs text-red-500 italic font-medium">{errors.root.message}</p> }

        <p className="text-sm text-center italic">
          Don&apos;t have an account yet? <span className="text-sky-600 underline cursor-pointer">Register here</span>
        </p>
      </form>
    </AuthLayout>
  );
}
