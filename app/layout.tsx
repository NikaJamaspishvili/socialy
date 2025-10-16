import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="max-w-[2000px] w-[90%] mx-auto min-h-screen">
        {children}
        </div>
      </body>
    </html>
  );
}
