import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Pass-through middleware kept to simplify future customization without Clerk.
export function middleware(_: NextRequest) {
  return NextResponse.next();
}