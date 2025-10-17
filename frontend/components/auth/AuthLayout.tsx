// components/AuthLayout.tsx
"use client";
import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="flex py-2 justify-center  ">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
            {title}
          </CardTitle>
          {description && (
            <p className="text-center text-gray-500 mt-1 text-sm">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
