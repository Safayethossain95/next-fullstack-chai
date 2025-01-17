import {z} from 'zod'

export const usernameValidatoin = z
.string()
.min(2, "username must be 2 characters")
.max(20, "username must be no more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/, "username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidatoin,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,{message:"password must be at least 6 characters"})
})