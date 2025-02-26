import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ABTestProvider from '@/components/ABTestProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIで作る 刺さるLP 5日間無料チャレンジ！",
  description: "たった5日で、あなたの事業の「強み」を最大限引き出す最強集客LPが完成します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0D1117] text-white`}
      >
        <ABTestProvider>
          {children}
        </ABTestProvider>
      </body>
    </html>
  );
}
