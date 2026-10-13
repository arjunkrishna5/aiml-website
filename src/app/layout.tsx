import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { APITesterModal } from "@/components/telemetry/APITesterModal";
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

export const metadata: Metadata = {
  title: "Department of Artificial Intelligence & Machine Learning",
  description:
    "Official portal of the AIML Department — Pioneering research, innovation, autonomous computing, and next-generation intelligence.",
  keywords: ["AIML", "Artificial Intelligence", "Machine Learning", "Research", "Engineering"],
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
      className={`${outfit.variable} ${inter.variable} dark antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#07080A] text-[#F0F6FC] selection:bg-[#00F0FF]/20 selection:text-[#00F0FF]"
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <APITesterModal />
      </body>
    </html>
  );
}
