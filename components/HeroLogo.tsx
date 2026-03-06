"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageProvider";

export default function HeroLogo() {
    const { theme } = useTheme();
    const { lang } = useLanguage();

    // The user specified 3.svg is the logo for the light theme.
    // arabic.svg is the stylized hero logo for dark theme.
    const logoSrc = theme === 'light' ? "/logo/light-logo.svg" : "/arabic.svg";

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
