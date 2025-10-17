import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased`}>
				<SessionProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<div className="max-w-[2000px] w-[90%] mx-auto min-h-screen">{children}</div>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
