import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "Note Gen PDF",
  description: "Take notes from PDF with the Power of AI",
};
const outfit = Outfit({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
