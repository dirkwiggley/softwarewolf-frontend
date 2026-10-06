import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SecurityProvider } from './SecurityContext';
import Navbar from './components/Navbar';
import './globals.css';
import { EB_Garamond } from 'next/font/google';

export const metadata: Metadata = {
  title: "Softwarewolf Home",
  description: "Dirk Wiggley's Gaming Site",
};

// Instantiate the font with your required character subsets
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond', // Define the custom CSS variable hook
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("wolf_theme")?.value || "light";
  const isDark = savedTheme === "dark";

  return (
    <html lang="en" className={isDark ? "dark" : ""}>
      {/* 
        We inject your custom web font class here alongside your global neutral resets.
        This allows your entire site tree to fluidly inherit beautiful typography automatically!
      */}
      <body className={`${ebGaramond.className} min-h-screen transition-colors duration-200 bg-slate-50 dark:bg-slate-950`}>
        <SecurityProvider>
          <Navbar />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
