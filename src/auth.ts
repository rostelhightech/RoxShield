import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // PrismaAdapter retiré : inutile avec JWT + Credentials et cause des appels DB
  // superflus à chaque login (source de timeouts sur Neon free tier).
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Rate limit: 10 login attempts per minute per email
        const email = (credentials.email as string).toLowerCase().trim();
        const { success: rlOk } = rateLimit(`login:${email}`, { maxRequests: 10, windowMs: 60_000 });
        if (!rlOk) {
          throw new Error("Trop de tentatives. Reessayez dans une minute.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          include: { organization: true },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        // Log login activity (non-blocking)
        if (user.organizationId) {
          db.activityLog.create({
            data: {
              action: "login",
              description: user.name || user.email,
              userId: user.id,
              organizationId: user.organizationId,
            },
          }).catch(() => {});
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          organizationId: user.organizationId,
          organizationName: user.organization?.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.organizationId = (user as any).organizationId;
        token.organizationName = (user as any).organizationName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        (session.user as any).role = token.role;
        (session.user as any).organizationId = token.organizationId;
        (session.user as any).organizationName = token.organizationName;
      }
      return session;
    },
  },
});
