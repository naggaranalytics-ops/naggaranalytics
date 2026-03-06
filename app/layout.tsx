import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic, Courier_Prime } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
    weight: ["300", "400", "700"],
    subsets: ["arabic", "latin"],
    variable: "--font-ibm-plex-sans-arabic"
});
const courierPrime = Courier_Prime({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-courier-prime"
});

export const metadata: Metadata = {
    title: "Naggar Analytics | Advanced Statistical Analysis & Data Science",
    description: "Expert statistical analysis, data visualization, and research methodology services. Naggar Analytics provides defensible results for complex research data.",
    icons: {
        icon: "/logo/logo.svg",
        shortcut: "/logo/logo.svg",
        apple: "/logo/logo.svg",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark" className={`${inter.variable} ${ibmPlexSansArabic.variable} ${courierPrime.variable}`}>
            <body className="font-sans antialiased">
                <ThemeProvider>
                    <LanguageProvider>
                        {children}
                        <WhatsAppWidget />
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
