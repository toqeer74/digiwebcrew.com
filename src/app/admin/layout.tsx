import "../globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { PageTransition } from "@/components/ui/page-transition";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

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
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <MotionProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </MotionProvider>
      </body>
    </html>
  );
}
