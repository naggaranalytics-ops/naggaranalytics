import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'الأسئلة الشائعة | نجار أناليتيكس' : 'FAQ | Naggar Analytics',
        description: isAr
            ? 'إجابات على الأسئلة الأكثر شيوعاً حول خدمات التحليل الإحصائي والمواعيد والأسعار.'
            : 'Answers to frequently asked questions about our statistical analysis services, timelines, and pricing.',
    };
}

import FAQPage from './PageContent';
export default FAQPage;
