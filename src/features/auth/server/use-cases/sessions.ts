
import { cookies, headers } from "next/headers";
import crypto from "crypto";
import { getIPAddress } from "./location";
import { userAgent } from "next/server";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";
import { SESSION_LIFETIME } from "@/config/constant";

type CreateSessionData = {
    userAgent: string;
    ip: string;
    userId: number;
    token: string;
}



const generateSessionToken = () => {
    return crypto.randomBytes(32).toString("hex").normalize();
}


const createUserSession = async ({ token, userId, userAgent, ip }: CreateSessionData) => {

    const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

    const [session] = await db.insert(sessions).values({
        "id": hashedToken,
        "userAgent": userAgent,
        "userId": userId,
        "ip": ip,
        "expiresAt": new Date(Date.now() + SESSION_LIFETIME * 1000),
    });

    return session;

}

export const createSessionAndSetCookie = async (userId: number) => {
    const token = generateSessionToken();
    const ip = await getIPAddress();
    const headersList = await headers();

    await createUserSession({
        token,
        userId: userId,
        userAgent: headersList.get("user-agent") || "",
        ip: ip,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        secure: true,
        httpOnly: true,
        maxAge: SESSION_LIFETIME,
    });
    console.log("Setting session cookie");

}