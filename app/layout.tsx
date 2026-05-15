import type { Metadata } from "next";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
