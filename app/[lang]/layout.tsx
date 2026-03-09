import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import HtmlLangSetter from "@/components/HtmlLangSetter";

const locales = ["en", "ar"];

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: {
            template: isAr ? '%s | نجار أناليتيكس' : '%s | Naggar Analytics',
            default: isAr
                ? 'نجار أناليتيكس | تحليل إحصائي متقدم وعلوم البيانات'
                : 'Naggar Analytics | Advanced Statistical Analysis & Data Science',
        },
        description: isAr
            ? 'تحليل إحصائي عالي الدقة، تصور البيانات، وخدمات المنهجية البحثية. نجار أناليتيكس تقدم نتائج موثوقة للبيانات البحثية المعقدة.'
            : 'Expert statistical analysis, data visualization, and research methodology services. Defensible results for complex research data.',
        alternates: {
            canonical: `/${params.lang}`,
            languages: {
                'en': '/en',
                'ar': '/ar',
            },
        },
        openGraph: {
            title: isAr ? 'نجار أناليتيكس' : 'Naggar Analytics',
            description: isAr
                ? 'تحليل إحصائي متقدم للباحثين والمؤسسات'
                : 'Advanced statistical analysis for researchers and institutions',
            locale: isAr ? 'ar_SA' : 'en_US',
            type: 'website',
        },
    };
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
