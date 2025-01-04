import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import AuthProvider from "./auth/Provider";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "Mealy, your meal planner",
  description: "Mealy is a meal planner that helps you plan your meals for the week.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`antialiased bg-background`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >

            <Header />
            <main className="container mx-auto p-5">

              {children}

            </main>

          </ThemeProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
