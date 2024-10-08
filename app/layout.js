import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "urban furniture",
  description: "Your furniture store",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full flex flex-col`}>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Toaster />
          <hr className="border-t border-gray-800 my-8 opacity-25" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
