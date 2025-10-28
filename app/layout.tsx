"use client";

import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased`}>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
							<div className="max-w-[2000px] w-[90%] mx-auto min-h-screen">{children}</div>
						</ThemeProvider>
					</SessionProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
