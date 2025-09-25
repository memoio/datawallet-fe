'use client';

import "./globals.css";
import { ReactNode } from "react";

import dynamic from "next/dynamic";

import { Inter } from "next/font/google";
import { DIDProvider } from "@/components/context/DIDContext";
import Navigation from "@/components/Reusable/Header";

const inter = Inter({ subsets: ['latin'] });

const Providers = dynamic(() => import("./providers").then(m => m.Providers), {
  ssr: false,
});


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DIDProvider>
            <div className="bg w-full">
              <Navigation />
            </div>
            {children}
          </DIDProvider>
        </Providers>
      </body>
    </html>
  );
}