import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<div className="max-w-[2000px] w-[90%] mx-auto min-h-screen">{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
