"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
    toggleLang: () => { },
    t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("na-lang") as Lang | null;
        if (stored) setLang(stored);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", lang);
        localStorage.setItem("na-lang", lang);
    }, [lang, mounted]);

    const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

    const t = (key: string): string => {
        return translations[lang]?.[key] || translations["en"]?.[key] || key;
    };

    const dir = lang === "ar" ? "rtl" : "ltr";

    return (
        <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
