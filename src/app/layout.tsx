import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import AntdStyledComponentsRegistry from "@/components/common/AntdStyledComponentsRegistry";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AntdThemeProvider from "@/components/providers/AntdThemeProvider";
import { cn } from "@/lib/cn";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud Hosting — Premium hosting for builders",
  description:
    "Fast, secure, and reliable cloud hosting for developers and teams.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          display.variable,
          mono.variable,
          "font-sans antialiased bg-background text-foreground h-screen overflow-hidden",
        )}
      >
        <ThemeProvider>
          <AntdStyledComponentsRegistry>
            <AntdThemeProvider>
              <div className="relative flex h-screen flex-col">
                <Header />
                <div
                  id="app-scroll"
                  className="flex flex-1 flex-col overflow-y-auto"
                >
                  <main className="flex min-h-0 flex-1 flex-col">
                    {children}
                  </main>
                  <Footer />
                </div>
              </div>
              <ToastContainer
                theme="light"
                position="top-center"
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
              />
            </AntdThemeProvider>
          </AntdStyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
