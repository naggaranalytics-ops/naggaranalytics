"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import en from "@/translations/en.json";
import ar from "@/translations/ar.json";

type Lang = "en" | "ar";

const translations: Record<Lang, Record<string, string>> = { en, ar };

interface LanguageContextType {
    lang: Lang;
    dir: "ltr" | "rtl";
    toggleLang: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "en",
    dir: "ltr",
    toggleLang: () => {},
    t: (key: string) => key,
});

export function LanguageProvider({
    children,
    initialLang,
}: {
    children: ReactNode;
    initialLang: Lang;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const lang = initialLang;
    const dir = lang === "ar" ? "rtl" : "ltr";

    const toggleLang = () => {
        const newLang = lang === "en" ? "ar" : "en";
        const newPathname = pathname.replace(/^\/(en|ar)/, `/${newLang}`);
        router.push(newPathname);
    };

    const t = (key: string): string => {
        return translations[lang]?.[key] || translations["en"]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
