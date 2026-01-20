"use server"

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { RegisterUserDataType, registerUserSchema } from "@/features/auth/auth.schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";

export const registrationActions = async (formData: RegisterUserDataType) => {
    try {

        const { data, error } = registerUserSchema.safeParse(formData);
        if (error) return {
            success: false,
            message: error.issues[0].message
        };
        const { name, userName, email, password, role } = data;


        const [user] = await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, userName)));

        if (user) {
            if (user.userName == userName) {
                return {
                    success: false,
                    message: "Username already exists."
                }
            }

            if (user.email == email) {
                return {
                    success: false,
                    message: "Email already exists."
                }
            }

        }

        const hashPassword = await argon2.hash(password);

        await db.insert(users).values({ name, userName, email, password: hashPassword, role });

        return {
            success: true,
            message: "Registration completed successfully."
        }

    } catch (error) {
        return {
            success: false,
            message: "Unknown error occurred! Please try again later."
        }
    }

}