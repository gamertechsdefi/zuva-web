import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Clear the session cookie preventing the redirect loop
  (await cookies()).delete("session");
  
  // Redirect to login page
  return NextResponse.redirect(new URL("/login", request.url));
}
