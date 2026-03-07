import "../globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/MotionProvider";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata = {
  title: "Software Lab Admin",
  description: "Authorized Personnel Only",
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-raly-base dark:bg-midnight-950 text-foreground transition-colors duration-300">
        <MotionProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </MotionProvider>
      </body>
    </html>
  );
}
