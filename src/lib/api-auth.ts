import { auth } from "@/auth";
import { NextResponse } from "next/server";

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  organizationId: string | null;
}

export type AuthSession = Awaited<ReturnType<typeof auth>> & {
  user: SessionUser;
};

/**
 * Get authenticated session or return 401 response.
 * Usage: const session = await getSessionOrFail(); if (session instanceof NextResponse) return session;
 */
export async function getSessionOrFail(): Promise<AuthSession | NextResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  return session as unknown as AuthSession;
}

/** Extract typed user from a validated session */
export function sessionUser(session: AuthSession): SessionUser {
  return session.user as SessionUser;
}
