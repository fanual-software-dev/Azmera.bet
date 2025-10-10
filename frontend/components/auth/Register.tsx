"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "./AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),
    phoneNumber: z.string().min(9, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, "You must accept the Terms"),
    privacy: z.boolean().refine((v) => v, "You must accept the Privacy Policy"),
    updates: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    console.log("Signup data", data);
    // TODO: call signup API
  };

  return (
    <AuthLayout title="Create Your Account" description="Join Azmera Bet today">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Full Name"
          {...register("fullName")}
          disabled={isSubmitting}
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs italic">{errors.fullName.message}</p>
        )}

        <Input
          placeholder="Phone Number"
          {...register("phoneNumber")}
          disabled={isSubmitting}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>
        )}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password.message}</p>
        )}

        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Terms checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <Checkbox {...register("terms")} />
            <span className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 underline">
                Terms and Conditions
              </Link>
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox {...register("privacy")} />
            <span className="text-sm">
              I accept the{" "}
              <Link href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox {...register("updates")} />
            <span className="text-sm">Send me updates and news</span>
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
