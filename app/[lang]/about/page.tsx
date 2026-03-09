import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'من نحن | نجار أناليتيكس' : 'About Us | Naggar Analytics',
        description: isAr
            ? 'تعرف على فريق نجار أناليتيكس المتخصص في التحليل الإحصائي عالي الدقة للباحثين والمؤسسات.'
            : 'Meet the Naggar Analytics team — senior biostatisticians delivering defensible, publication-ready statistical analysis.',
    };
}

import AboutPage from './PageContent';
export default AboutPage;
