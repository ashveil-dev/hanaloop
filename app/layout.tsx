import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Providers from "./providers";
import ModalRoot from "@/components/layout/ModalRoot";
import Layout from "@/components/layout";

export const metadata: Metadata = {
  title: "Hana Dashboard",
  description: "Dashboard for managing carbon emissions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full font-pretendard">
      <link rel="icon" href="/icons/logo.png" type="image/png" sizes="32x32" />
      <body className="min-w-full h-full min-h-full">
        <Providers>
          <ModalRoot />
          <Layout>{children}</Layout>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
