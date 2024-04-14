"use client"

// import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"

// const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={"min-w-screen"}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
