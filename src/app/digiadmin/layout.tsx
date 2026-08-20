import "../globals.css";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Digi Web Crew Admin",
  description: "Authorized Personnel Only",
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geist.variable} ${geistMono.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
        style={{
          background: "var(--adm-bg, #f4f6fb)",
          color: "var(--adm-text, #0f172a)",
          fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans', sans-serif)",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
