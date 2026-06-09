import { Raleway, Inter } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";
import Preloader from "@/components/shared/Preloader/Preloader";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata = {
  title: "Thrifty | Elevate your style effortlessly",
  description: "Minimalist streetwear and thrifted apparel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        suppressHydrationWarning
        className={`${raleway.variable} font-sans flex flex-col min-h-screen bg-background text-foreground`}
      >
        <Preloader />

        {/* Main content takes up available flex space, pushing the footer down */}
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}