import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'أعمالنا | نجار أناليتيكس' : 'Portfolio | Naggar Analytics',
        description: isAr
            ? 'مشاريع حقيقية ودراسات حالة تعكس التحليل الإحصائي الدقيق الذي نقدمه لعملائنا.'
            : 'Real projects and case studies showcasing our rigorous statistical analysis delivered to clients worldwide.',
    };
}

import PortfolioPage from './PageContent';
export default PortfolioPage;
