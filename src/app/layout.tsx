import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZChess - Chess like a Zork",
  description: "ZChess is a text-based chess game inspired by Zork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NOTECHESS - Chess like a Zork</title>
      </head>
      <body className="relative w-screen h-screen overflow-hidden hidden md:flex">
        {children}
      </body>
    </html>
  );
}
