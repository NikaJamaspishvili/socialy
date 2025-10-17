// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
	const { auth, nextUrl } = req;
	const isAuthPage = nextUrl.pathname.startsWith("/login");

	if (!auth && !isAuthPage) return NextResponse.redirect(new URL("/login", nextUrl));
	if (auth && isAuthPage) return NextResponse.redirect(new URL("/", nextUrl));

	return NextResponse.next();
});

export const config = {
	matcher: ["/", "/login"],
};
