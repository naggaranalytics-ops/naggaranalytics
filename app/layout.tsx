import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic, Courier_Prime } from "next/font/google";
import "./globals.css";

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
    title: "Naggar Analytics Dashboard",
    description: "Advanced Statistical Analysis Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${ibmPlexSansArabic.variable} ${courierPrime.variable}`}>
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
