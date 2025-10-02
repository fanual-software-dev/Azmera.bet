'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import AuthForm from '../auth/auth-form';
import {  X } from 'lucide-react';

type conditions = 'signup' | 'login' | 'none'

const Header = () => {
    
    const [conditionalRenderer, setConditionalRenderer] = useState<conditions>('none')

    useEffect(() => {
    if (conditionalRenderer ==="login" || conditionalRenderer === "signup") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [conditionalRenderer, conditionalRenderer]);

  return (
    <>
        <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-black font-bold">A</div>
                <div>
                <h1 className="text-lg font-semibold">Azmera Bet</h1>
                <p className="text-xs text-slate-400">Bet smarter. Win bigger.</p>
                </div>
            </div>
            </div>

            <nav className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline">Features</Button>
            <Button variant="ghost" className="hidden sm:inline">Games</Button>
            <Button variant="ghost" className="hidden sm:inline">How it works</Button>
            <div className="flex items-center gap-2">
                <Button onClick={()=>setConditionalRenderer('login')}  variant="default" className='font-[Poppins] bg-sky-700 text-xs cursor-pointer'>Log In</Button>
                <Button onClick={()=>setConditionalRenderer('signup')}  variant="default" className="ml-2 font-[Poppins] bg-sky-700 text-xs cursor-pointer">Register</Button>
            </div>
            </nav>
        </header>

        {
            conditionalRenderer!=="none" && 
            <div className="fixed backdrop-blur-3xl z-50  opacity-[98%] w-full min-h-screen flex py-8 justify-center">
                <div className='relative'>
                    <AuthForm type={conditionalRenderer} />
                    <X onClick={()=>setConditionalRenderer("none")} size={20} className='absolute top-3 right-3 cursor-pointer text-white'/>
                </div>
            </div>
        }

    </>
  )
}

export default Header
