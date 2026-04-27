import { Raleway } from 'next/font/google';
import "./globals.css";

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
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${raleway.variable} font-sans flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden`}
      >

        {/* Main content takes up available flex space, pushing the footer down */}
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>


      </body>
    </html>
  );
}