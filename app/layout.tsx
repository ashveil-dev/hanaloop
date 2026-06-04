import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Providers from "./providers";
import ModalRoot from "@/components/layout/ModalRoot";
import Layout from "@/components/layout";

export const metadata: Metadata = {
  title: "hanaloop",
  description: "Carbon emission intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full font-pretendard">
      <link rel="icon" href="/icons/hanaloop.png" type="image/png" sizes="32x32" />
      <body className="min-w-full h-full min-h-full">
        <Providers>
          <ModalRoot />
          <Layout>{children}</Layout>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
