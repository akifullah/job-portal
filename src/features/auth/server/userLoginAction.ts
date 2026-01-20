"use server"
import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import argon2 from "argon2";

type LoginData = {
    email: string;
    password: string;
};

export const userLoginAction = async (data: LoginData) => {
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