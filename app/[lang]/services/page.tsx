import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'خدماتنا | نجار أناليتيكس' : 'Services | Naggar Analytics',
        description: isAr
            ? 'استشارات إحصائية، تحليل بيانات متقدم، ودعم النشر العلمي. خدمات شاملة للباحثين والمؤسسات.'
            : 'Statistical consulting, advanced data analysis, and publication support services for researchers and institutions.',
    };
}

import ServicesPage from './PageContent';
export default ServicesPage;
