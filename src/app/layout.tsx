"use client"

import { Flowbite, ThemeModeScript } from "flowbite-react";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <SessionProvider>

          <body className="min-w-screen">
            <Flowbite>
              {children}
            </Flowbite>
          </body>
      </SessionProvider>
    </html>
  );
}
