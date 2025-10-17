import zod from "zod";

export const userSchema = zod.object({
    fullName: zod.string().min(3, "Name must be at least 3 characters").optional(),
    phoneNumber: zod.string().min(10, "Phone number must be at least 9 characters"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: zod.string().min(6, "Confirm Password must be at least 6 characters").optional(),
    verificationCode: zod.string().length(6, "Verification code must be 6 characters").optional(),
    refreshToken: zod.string().optional(),

})

export const checkboxSchema = zod.object({
    privacy: zod.boolean().default(false),
    terms: zod.boolean().default(false),
    
}).refine((data) => data.terms && data.privacy, {
    message: "You must agree to all terms and privacy rules",
    path: ["privacy"], // error will appear under the first checkbox
  });

export type checkbox = zod.infer<typeof checkboxSchema>;

export type User = zod.infer<typeof userSchema>;

export const loginSchema = userSchema.pick({phoneNumber: true, password: true});
export const signupSchema = userSchema.pick({fullName: true, phoneNumber: true, password: true, confirmPassword: true}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
export const forgotPasswordSchema = userSchema.pick({phoneNumber: true});
export const verifySchema = userSchema.pick({phone: true, verificationCode: true});
export const resetPasswordSchema = userSchema.pick({phone: true, password: true, confirmPassword: true}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"});
export const changePasswordSchema = userSchema.pick({password: true, confirmPassword: true}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"});
