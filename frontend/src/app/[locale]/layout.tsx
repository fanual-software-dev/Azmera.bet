import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider} from "next-intl";
import { getMessages } from "next-intl/server";
import Header from '@/components/static-ui/header';
import Footer from '@/components/static-ui/footer';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azmera Bet",
  description: "This is a betting website created by Azmera Bet development team",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-200 `}
        >
          <Header/>
          
          {children}
          
          <Footer/>
          
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
