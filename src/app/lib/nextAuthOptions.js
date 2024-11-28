import CredentialsProvider from "next-auth/providers/credentials";
import config from '../../../config'

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const apiUrl = config.hostBackend + "api/login";
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                if (!res.ok) {
                    throw new Error('Login failed' + res.statusText)
                }

                try {
                    const user = await res.json();
                    if (user) {
                        return user
                    } else {
                        throw new Error('Invalid user or password')
                    }
                } catch (err) {
                    throw new Error('Error parsing response' + err.message)
                }
            }
        })
    ],
    session: {
        strategy: "jwt" // ใช้ session แบบ JWT
    },
    callbacks: {
        // Callback สำหรับ JWT token
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id; // เพิ่มข้อมูล user.id ลงใน JWT token
                token.role = user.role;
            }
            return token;
        },
        // Callback สำหรับ session
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id; // เพิ่มข้อมูล user.id ลงใน session
                session.user.role = token.role;
            }
            return session;
        }
    }
};