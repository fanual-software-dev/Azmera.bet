// app/auth/layout.tsx
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-2 md:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Azmera Bet</h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure login & registration system
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
