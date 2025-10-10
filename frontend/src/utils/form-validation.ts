import zod from "zod";

export const userSchema = zod.object({
    fullName: zod.string().min(3, "Name must be at least 3 characters").optional(),
    phoneNumber: zod.string().min(10, "Phone number must be at least 9 characters"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: zod.string().min(6, "Confirm Password must be at least 6 characters").optional(),
    verificationCode: zod.string().length(6, "Verification code must be 6 characters").optional(),
    refreshToken: zod.string().optional(),

})

export type User = zod.infer<typeof userSchema>;

export const loginSchema = userSchema.pick({phoneNumber: true, password: true});
export const signupSchema = userSchema.pick({fullName: true, phoneNumber: true, password: true, confirmPassword: true}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"});
export const forgotPasswordSchema = userSchema.pick({phoneNumber: true});
export const verifySchema = userSchema.pick({phone: true, verificationCode: true});
export const resetPasswordSchema = userSchema.pick({phone: true, password: true, confirmPassword: true}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"});
export const changePasswordSchema = userSchema.pick({password: true, confirmPassword: true}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"});
