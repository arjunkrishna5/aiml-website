import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "CYPHER@AIML2026";
const SESSION_COOKIE_NAME = "cypher_admin_session";
const SESSION_TOKEN = "cypher_auth_token_ncerc_aiml_2026";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        message: "Admin authenticated successfully.",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin passcode." },
      { status: 401 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Authentication failed.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  const isAuthenticated = session?.value === SESSION_TOKEN;
  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({
    success: true,
    message: "Admin logged out.",
  });
}
