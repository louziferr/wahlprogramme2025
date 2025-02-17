import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/luckiest-guy";
import "@fontsource/dm-serif-text";

export const metadata: Metadata = {
  title: "Wahlprogramm Analyse",
  description:
    "Linguistische Analyse der Wahlprogramme der Parteien zur Bundestagswahl 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-black">{children}</body>
    </html>
  );
}
