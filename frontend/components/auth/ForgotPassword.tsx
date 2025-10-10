"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "./AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const forgotSchema = z.object({
  phoneNumber: z.string().min(9, "Phone number is required"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    console.log("Forgot password data", data);
    // TODO: call forgot password API
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      description="Enter your phone number to reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Phone Number"
          {...register("phoneNumber")}
          disabled={isSubmitting}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
