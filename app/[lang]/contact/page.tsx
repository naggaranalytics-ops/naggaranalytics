import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'تواصل معنا | نجار أناليتيكس' : 'Contact Us | Naggar Analytics',
        description: isAr
            ? 'تواصل مع فريق نجار أناليتيكس لمناقشة مشروعك البحثي واحتياجاتك في التحليل الإحصائي.'
            : 'Get in touch with Naggar Analytics to discuss your research project and statistical analysis needs.',
    };
}

import ContactPage from './PageContent';
export default ContactPage;
