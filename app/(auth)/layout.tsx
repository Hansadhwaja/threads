import "../globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";



export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads App.",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (<ClerkProvider>
        <html>
        <body className="flex  bg-dark-1">
          <div className="w-full flex justify-center items-center min-h-screen">
          {children}
          </div>
      </body>
        </html>
    </ClerkProvider>
     
    );
  }