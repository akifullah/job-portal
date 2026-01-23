"use server"
import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import argon2 from "argon2";
import { LoginUserDataType, loginUserSchema } from "../auth.schema";
import { createSessionAndSetCookie } from "./use-cases/sessions";


export const userLoginAction = async (formData: LoginUserDataType) => {
    const { data, error } = loginUserSchema.safeParse(formData);

    if (error) return {
        success: false,
        message: error.issues[0].message
    };

    const { email, password } = data;

    try {

        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) {
            return {
                success: false,
                message: "Email or password is incorrect."
            }
        }
        if (user.email !== email) {
            return {
                success: false,
                message: "Email or password is incorrect."
            }
        }

        const isValidPassword = await argon2.verify(user.password, password);

        if (!isValidPassword) {
            return {
                success: false,
                message: "Email or password is incorrect."
            }
        }

        await createSessionAndSetCookie(user.id);
        
        return {
            success: true,
            message: "Logged in successful."
        }


    } catch (error) {
        return {
            success: false,
            message: "Something went wrong! Please try again later."
        }
    }


};