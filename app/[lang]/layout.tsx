import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import HtmlLangSetter from "@/components/HtmlLangSetter";

const locales = ["en", "ar"];

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    if (!locales.includes(params.lang)) {
        notFound();
    }

    return (
        <LanguageProvider initialLang={params.lang as "en" | "ar"}>
            <HtmlLangSetter lang={params.lang} />
            {children}
            <WhatsAppWidget />
        </LanguageProvider>
    );
}
