"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { div } from "framer-motion/client";

type AuthFormProps = {
  type: "login" | "signup" | "forgotPassword" | "verify";
};

type passwordsOpened = {
    password: boolean,
    confirmPassword: boolean
}

export default function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [eyesOpen,setEyesOpen] = useState<passwordsOpened>({
    password: false,
    confirmPassword: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate with backend (Nest.js)
    const response = await fetch("https://api.afromessage.com/api/send",{
      method: "POST",
      body: JSON.stringify({
              from: "e80ad9d8-adf3-463f-80f4-7c4b39f7f164",
              sender: "+251940646657",
              to: "+251965168741",
              message: `"Your Azmera Bet verification code is: ${100010}. This code will expire in 5 minutes. Do not share it with anyone."`,
              callback:""
             
             
            }),
      headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiVUt0UEhrTm5zQjlvVUx4YVBwQ1BwRTQ5OEFqM0t3YVgiLCJleHAiOjE5MTcwMjU2ODgsImlhdCI6MTc1OTI1OTI4OCwianRpIjoiMDFjY2U5YWEtMWM4ZC00ODgzLWE2NTUtMjA2NGEzYjgxMGExIn0.a5w4vhUBglUGdIlsMv28ogSS8ChOXklLPxjY3Eqqk4k`
      }
    })

    console.log("here is the response body", response)
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-slate-900 via-slate-950 to-black p-16 rounded-2xl shadow-md border w-full md:w-2xl max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-white">
        {type === "login" ? "Welcome Back" : "Create Account"}
      </h2>

      {type === "signup" && (
        <Input placeholder="Full Name" className="bg-white/1 border my-2  shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" />
      )}
      <Input placeholder="Email" type="email" className="bg-white/1 my-2 border shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" />
      <div className="relative w-full flex items-center">
        <Input placeholder="Password" type={`${eyesOpen.password ? "text": "password"}`} className="bg-white/1 my-2 border shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" />
        <div className="absolute right-2">
            {!eyesOpen.password ? <EyeOff size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, password:true})} /> : <Eye size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, password:false})}/>}

        </div>
      </div>
      {type === "signup" && (
        <div className="relative w-full flex items-center">
            <Input placeholder="Confirm Password" type={`${eyesOpen.confirmPassword ? "text": "password"}`} className="bg-white/1 border shadow-md shadow-white/15 placeholder:text-white placeholder:italic placeholder:text-xs" />
            <div className="absolute right-2">
                {!eyesOpen.confirmPassword ? <EyeOff size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, confirmPassword:true})} /> : <Eye size={14} className="cursor-pointer" onClick={()=> setEyesOpen({...eyesOpen, confirmPassword:false})}/>}

            </div>

      </div>
      )}

      { type === "login" && 
        <div className="flex justify-end my-4">
          <button className="cursor-pointer underline font-[Poppins] italic text-white text-xs">Forgot Passowrd?</button>
        </div>
      }

      {
        type==="signup" && 
        <div className="flex flex-col gap-2 mt-8">
          <p className="flex items-center gap-2">
            <Input className="w-4 h-4" type="checkbox"></Input>
            <span className="text-[11px] font-mono italics">
              I agree to play responsibly
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Input className="w-4 h-4" type="checkbox"></Input>
            <span className="text-[11px] font-mono italics">
              I am legally above age of 21
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Input className="w-4 h-4" type="checkbox"></Input>
            <span className="text-[11px] font-mono italics">
              I agree to terms and conditions of this site
            </span>
          </p>
        </div>
      }


      <Button type="submit" className={`w-full my-4 bg-sky-700 cursor-pointer`} disabled={loading}>
        {loading ? "Loading..." : type === "login" ? "Login" : "Sign Up"}
      </Button>

      

      <p className="text-sm text-center text-gray-50">
        {type === "login" ? (
          <>Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-400 hover:underline">Sign up</Link></>
        ) : (
          <>Already have an account? <Link href="/auth/login" className="text-blue-400 hover:underline">Login</Link></>
        )}
      </p>
    </form>
  );
}
