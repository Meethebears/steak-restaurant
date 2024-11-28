import NextAuth from "next-auth";
import authOptions from '../../../lib/nextAuthOptions'

// ใช้งาน NextAuth ใน API route
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // รองรับทั้ง GET และ POST
