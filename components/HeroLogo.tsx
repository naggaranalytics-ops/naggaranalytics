"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageProvider";

export default function HeroLogo() {
    const { theme } = useTheme();
    const { lang } = useLanguage();

    // Select hero logo based on language and theme
    let logoSrc = "/logos/hero-en-light.svg";
    if (lang === 'ar') {
        logoSrc = theme === 'dark' ? "/logos/hero-ar-dark.svg" : "/logos/hero-ar-light.svg";
    } else {
        logoSrc = theme === 'dark' ? "/logos/hero-en-dark.svg" : "/logos/hero-en-light.svg";
    }

    return (
        <h1 className="flex justify-center mb-6 drop-shadow-2xl">
            <Image
                src={logoSrc}
                alt="Naggar Analytics"
                width={800}
                height={800}
                className="w-auto h-32 md:h-48 lg:h-64 object-contain"
                priority
            />
        </h1>
    );
}
