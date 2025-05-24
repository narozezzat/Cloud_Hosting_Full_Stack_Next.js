import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import AntThemeProvider from "./common/themes/MainThem";
import AntdStyledComponentsRegistry from "@/components/common/AntdStyledComponentsRegistry";
// import 'antd/dist/reset.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud hosting project",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AntdRegistry> */}
        <AntdStyledComponentsRegistry>
          <AntThemeProvider>
            <Header />
            <ToastContainer theme="colored" position="top-center" />
            <main>{children}</main>
            <Footer />
          </AntThemeProvider>
        </AntdStyledComponentsRegistry>

        {/* </AntdRegistry> */}
      </body>
    </html>
  );
}
