"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "./AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const loginSchema = z.object({
  phoneNumber: z.string().min(9, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login data", data);
    // TODO: call login API
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      description="Log in to your Azmera Bet account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            placeholder="Phone Number"
            {...register("phoneNumber")}
            disabled={isSubmitting}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-sm text-blue-600">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
