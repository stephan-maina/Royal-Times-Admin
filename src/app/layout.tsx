import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/Theme-provider";
import { Toaster } from "react-hot-toast";

import { SWRConfig } from "swr";

// Define fonts
const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Royal Times",
  description: "Royal Times App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SWRConfig value={{ revalidateIfStale: false, revalidateOnFocus: false }}>
      <html lang="en">
        <body className={`${inter.className} ${dmSans.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          {/* ✅ Only one Toaster */}
          <Toaster position="bottom-right" />
        </body>
      </html>
    </SWRConfig>
  );
}
