import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CYPHER | Department of AIML — Nehru College of Engineering & Research Centre",
  description:
    "Official portal of CYPHER — Association of the Department of Artificial Intelligence & Machine Learning at Nehru College of Engineering and Research Centre (NCERC), Pampady, Thrissur, Kerala.",
  keywords: [
    "CYPHER",
    "AIML",
    "NCERC",
    "Nehru College of Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Thrissur",
    "KTU",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} ${playfair.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F4F5F8] text-[#0F172A] selection:bg-[#DC2626]/20 selection:text-[#DC2626]"
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
