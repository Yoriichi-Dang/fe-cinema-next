import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isExpired } from "./app/api/auth/route";
import { jwtDecode } from "jwt-decode";
const privatePaths = ["/admin"];
const authPaths = ["/login", "/signup"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const path = request.nextUrl.pathname;
  const expiresTokenDate = request.cookies.get("expiresTokenDate")?.value;
  let isStaff = false;
  let isSuperUser = false;
  if (token) {
    const decoded = jwtDecode<any>(token?.value || "");
    if (decoded) {
      isStaff = decoded["is_staff"];
      isSuperUser = decoded["is_superuser"];
    }
  }
  // Kiểm tra xem token có hết hạn không
  const expired = isExpired(expiresTokenDate);
  if (!token && privatePaths.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && privatePaths.some((p) => path.startsWith(p)) && expired) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && authPaths.includes(path) && !expired) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    token &&
    privatePaths.some((p) => path.startsWith(p)) &&
    !expired &&
    !isStaff
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...authPaths, ...privatePaths],
};
