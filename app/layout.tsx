import type { Metadata } from "next";
import { Toaster } from "sonner";
import Providers from "./providers";
import "./globals.css";


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
    <html lang="en" className={"w-full h-full"}>
      <link rel="icon" href="/icons/logo.png" type="image/png" sizes="32x32" />
      <body className="min-w-full h-full min-h-full">
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
