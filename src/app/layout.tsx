import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AppThemeProvider from "@/contexts/provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algebraic Timer",
  description: "Timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppThemeProvider>
        <NavBar></NavBar>
        <main className="bg-white w-full min-h-screen text-black">{children}</main>
        <Footer></Footer>
        </AppThemeProvider>
      </body>
    </html>
  );
}
