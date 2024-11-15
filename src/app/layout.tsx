import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import Provider from "@/lib/provider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "App condominio Feliz",
  description: "Aplicación demo para uso local..",
  icons: "/logo-new.png"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Provider>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
