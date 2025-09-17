'use client';

import "./globals.css";
import { ReactNode } from "react";

import dynamic from "next/dynamic";

import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin'] });

const Providers = dynamic(() => import("./providers").then(m => m.Providers), {
  ssr: false,
});


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}