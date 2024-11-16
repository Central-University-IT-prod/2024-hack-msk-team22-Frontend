import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Splitter",
  description: "Splitter - лучший способ разделить платежи между друзьями",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
