import type { Metadata } from "next";
import "./globals.css";


import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "MyProject",
    template: "%s | MyProject",
  },

  description:
    "A modern Front-End application built with Next.js, React and Tailwind CSS.",

  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Frontend",
    "Web Development",
  ],

  authors: [
    {
      name: "Ahmed Abu Al-Khair",
    },
  ],

  creator: "Ahmed Abu Al-Khair",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "MyProject",
    description:
      "A modern Front-End application built with Next.js, React and Tailwind CSS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <Header />

          <main className="min-h-[70vh] pt-20">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}