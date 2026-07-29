import type { Metadata } from "next";
import "@/app/globals.css";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
export const metadata: Metadata = {
  title: "Eunit",
  description: "",
  icons: "/assets/logos/logo-symbol.svg",
};
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          forcedTheme="light"
        >
          <ToastContainer className="text-xs" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
