"use client";

import { useForm } from "react-hook-form";

import { AuthLayout } from "./AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";




export default function Signup() {

  const { register, handleSubmit, watch, formState:{ errors, isSubmitting } } = useForm({
    defaultValues:{
      fullName:"",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data:unknown)=>{
    console.log(data)
  }

  

  return (
    <AuthLayout title="Create Your Account" description="Register and be part of the team">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Type your name"
          className={`${errors.fullName ? "border-red-500": ""}`}
          {...register("fullName", { required: "Full Name is required", minLength:{ value:3, message:"Name should be atleast 3 charachters long" } })}
        />
        { errors.fullName && <p className="text-xs text-red-500 italic font-medium">{errors.fullName.message}</p> }

        <Input
          placeholder="Phone number"
          className={`${errors.phoneNumber ? "border-red-500": ""}`}
          {...register("phoneNumber", { required: "Phone number is required", minLength:{ value:10, message:"Phone number should be atleast 10 characters long" } })}
        />
        { errors.phoneNumber && <p className="text-xs text-red-500 italic font-medium">{errors.phoneNumber.message}</p> }

        <Input
          placeholder="Password"
          className={`${errors.password ? "border-red-500": ""}`}
          {...register("password", { required: "Password is required", minLength:{ value:6, message:"Password should be atleast 6 characters long" } })}
        />
        { errors.password && <p className="text-xs text-red-500 italic font-medium">{errors.password.message}</p> }

        <Input
          placeholder="Confirm Password"
          className={`${errors.confirmPassword ? "border-red-500": ""}`}
          {...register("confirmPassword", { required: "Confirm password is required"})}
        />
        { errors.confirmPassword && <p className="text-xs text-red-500 italic font-medium">{errors.confirmPassword.message}</p> }

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
            rounded-lg"
        >
          { isSubmitting ? <span className="loading loading-spinner loading-xl"></span> : "Register"}
          
        </button>
      </form>
    </AuthLayout>
  );
}
